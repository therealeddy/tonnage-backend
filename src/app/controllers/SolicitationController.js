import pagarme from 'pagarme';
import Solicitation from '../models/Solicitation';
import Route from '../models/Route';
import History from '../models/History';
import Load from '../models/Load';
import Transaction from '../models/Transaction';
import User from '../models/User';

import pagarmeConfig from '../../config/pagarmeConfig';

class SolicitationController {
  async index(req, res) {
    const { userId } = req;
    const { paged = 1, status = null } = req.query;

    const { count, rows } = await Solicitation.findAndCountAll({
      where: status
        ? {
            id_user: userId,
            status,
          }
        : { id_user: userId },
      order: [['id', 'DESC']],
      limit: 5,
      offset: (paged - 1) * 5,
      attributes: ['id', 'status', 'collection_date', 'created_at'],
      include: [
        {
          model: Route,
          as: 'route',
          attributes: ['destination_address', 'origin_address'],
        },
        {
          model: Transaction,
          as: 'transaction',
          attributes: ['name_load'],
        },
      ],
    });

    return res.json({ rows, count });
  }

  async show(req, res) {
    const { id } = req.params;

    const solicitation = await Solicitation.findOne({
      where: { id },
      attributes: ['status', 'description', 'collection_date', 'created_at'],
      include: [
        {
          model: Route,
          as: 'route',
          attributes: [
            'destination_address',
            'destination_latitude',
            'destination_longitude',
            'origin_address',
            'origin_latitude',
            'origin_longitude',
          ],
        },
        {
          model: Transaction,
          as: 'transaction',
          attributes: [
            'name_load',
            'description_load',
            'price_load',
            'price_per_kilometer',
            'price_total',
          ],
        },
      ],
    });

    if (!solicitation) {
      return res.json({ error: 'Solicitação não encontrada!' });
    }

    return res.json(solicitation);
  }

  async store(req, res) {
    const { body } = req;

    const {
      id_load,
      description,
      price_per_kilometer,
      route: {
        destination_address,
        destination_latitude,
        destination_longitude,
        origin_address,
        origin_latitude,
        origin_longitude,
      },
      card: { numberCard, cod, dateValidity, holderName },
    } = body;

    const load = await Load.findByPk(id_load);

    if (!load) {
      return res.json({
        error: 'Carga não encontrada, por favor tente novamente!',
      });
    }

    const {
      name: name_load,
      description: description_load,
      price: price_load,
    } = load;

    const card = {
      card_holder_name: holderName,
      card_expiration_date: dateValidity,
      card_number: numberCard,
      card_cvv: cod,
    };

    const cardValidation = await pagarme.validate({
      card,
    });

    if (
      !cardValidation.card.card_holder_name ||
      !cardValidation.card.card_number ||
      !cardValidation.card.card_expiration_date ||
      !cardValidation.card.card_cvv
    ) {
      return res.json({
        error: 'Cartão invalido, verifique as informações cadastradas!',
      });
    }

    const { api_key } = pagarmeConfig;

    const client = await pagarme.client.connect({
      api_key,
    });

    const card_hash = await client.security.encrypt(card);

    const {
      name: name_user,
      email: email_user,
      cpf: cpf_user,
      tel: tel_user,
    } = await User.findByPk(req.userId);

    const pagarmeTransaction = await client.transactions
      .create({
        amount: (price_load + price_per_kilometer) * 100,
        card_hash,
        ...card,
        payment_method: 'credit_card',
        customer: {
          external_id: `${req.userId}`,
          country: 'br',
          name: name_user,
          email: email_user,
          phone_numbers: [`+55${tel_user.replace(/\D/g, '')}`],
          type: 'individual',
          documents: [{ type: 'cpf', number: cpf_user }],
        },
        billing: {
          name: 'Trinity Moss',
          address: {
            country: 'br',
            state: 'sp',
            city: 'Cotia',
            neighborhood: 'Rio Cotia',
            street: 'Rua Matrix',
            street_number: '9999',
            zipcode: '06714360',
          },
        },
        items: [
          {
            id: String(load.id),
            title: load.name,
            unit_price: 100,
            quantity: 1,
            tangible: true,
          },
        ],
      })
      .catch((error) => error.response);

    if (pagarmeTransaction.errors) {
      return res.json({
        error: 'Ocorreu um erro na compra, por favor tente novamente!',
      });
    }

    const { id: id_pagarme } = pagarmeTransaction;

    // CANCELANDO TRANSACAO -------------------------------------------------

    // const pagarmeTransactionCanceled = await client.transactions.refund({
    //   id: id_pagarme,
    // });

    const { id: id_transaction } = await Transaction.create({
      id_pagarme,
      name_load,
      description_load,
      price_load,
      price_per_kilometer,
      price_total: price_load + price_per_kilometer,
    });

    const route = await Route.create({
      destination_address,
      destination_latitude,
      destination_longitude,
      origin_address,
      origin_latitude,
      origin_longitude,
    });

    const solicitation = await Solicitation.create({
      id_transaction,
      id_user: req.userId,
      id_route: route.id,
      status: 'create',
      description,
    });

    await History.create({
      id_user: req.userId,
      id_solicitation: solicitation.id,
      action: 'create',
    });

    return res.json({ success: 'Solicitação feita com sucesso!' });
  }
}

export default new SolicitationController();
