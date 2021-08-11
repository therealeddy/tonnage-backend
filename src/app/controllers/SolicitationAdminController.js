import pagarme from 'pagarme';
import Solicitation from '../models/Solicitation';
import Route from '../models/Route';
import User from '../models/User';
import History from '../models/History';
import Transaction from '../models/Transaction';
import Evaluation from '../models/Evaluation';

import pagarmeConfig from '../../config/pagarmeConfig';

class SolicitationAdminController {
  async index(req, res) {
    const {
      paged = 1,
      status = null,
      id_user = null,
      id_user_trucker = null,
      findAll = false,
    } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (id_user) {
      where.id_user = id_user;
    }

    if (id_user_trucker) {
      where.id_user_trucker = id_user_trucker;
    }

    const { count, rows } = await Solicitation.findAndCountAll({
      where,
      order: [['id', 'DESC']],
      limit: findAll ? 1000000000 : 5,
      offset: (paged - 1) * 5,
      attributes: ['id', 'status', 'collection_date', 'created_at'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'user_trucker',
          attributes: ['name'],
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
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'user_trucker',
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
        {
          model: Evaluation,
          as: 'evaluation',
          attributes: ['evaluation', 'comment'],
        },
      ],
    });

    if (!solicitation) {
      return res.json({ error: 'Solicitação não encontrada!' });
    }

    return res.json(solicitation);
  }

  async update(req, res) {
    const { body } = req;

    const { status } = body;

    const { id } = req.params;

    const solicitation = await Solicitation.findByPk(id);

    const { id_transaction } = solicitation;

    const { status: statusSoli } = solicitation;

    if (statusSoli !== status && status === 'canceled') {
      try {
        const { id_pagarme } = await Transaction.findByPk(id_transaction);

        const { api_key } = pagarmeConfig;

        const client = await pagarme.client.connect({
          api_key,
        });

        const transactionCanceled = await client.transactions.refund({
          id: id_pagarme,
        });

        console.log(transactionCanceled);
      } catch (err) {
        console.log(err);
      }
    }

    await solicitation.update(body);

    if (statusSoli !== status) {
      await History.create({
        id_user: req.userId,
        id_solicitation: solicitation.id,
        action: status,
      });
    }

    return res.json({ success: 'Solicitação atualizada com sucesso!' });
  }
}

export default new SolicitationAdminController();
