import { Op } from 'sequelize';
import { startOfDay, addDays, endOfDay } from 'date-fns';
import Solicitation from '../models/Solicitation';
import Route from '../models/Route';
import User from '../models/User';
import History from '../models/History';
import Transaction from '../models/Transaction';
import Evaluation from '../models/Evaluation';

class SolicitationAdminController {
  async index(req, res) {
    const { paged = 1 } = req.query;

    const today = await Solicitation.findAll({
      where: {
        id_user_trucker: req.userId,
        collection_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
      order: [['collection_date', 'DESC']],
      attributes: ['id', 'status', 'collection_date'],
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

    const tomorrow = await Solicitation.findAll({
      where: {
        id_user_trucker: req.userId,
        collection_date: {
          [Op.between]: [
            addDays(startOfDay(new Date()), 1),
            addDays(endOfDay(new Date()), 1),
          ],
        },
      },
      order: [['collection_date', 'DESC']],
      attributes: ['id', 'status', 'collection_date'],
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

    const { count, rows } = await Solicitation.findAndCountAll({
      where: {
        id_user_trucker: req.userId,
        collection_date: {
          [Op.gte]: addDays(startOfDay(new Date()), 2),
        },
      },
      order: [['id', 'DESC']],
      limit: 5,
      offset: (paged - 1) * 5,
      attributes: ['id', 'status', 'collection_date'],
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

    return res.json({ today, tomorrow, rows, count });
  }

  async show(req, res) {
    const { id } = req.params;

    const solicitation = await Solicitation.findOne({
      where: { id },
      attributes: ['status', 'description', 'collection_date'],
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
          model: Transaction,
          as: 'transaction',
          attributes: ['name_load'],
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

    if (status === 'canceled') {
      return res.json({
        error: 'Você não tem permissão para cancelar uma solicitação!',
      });
    }

    const { id } = req.params;

    const solicitation = await Solicitation.findByPk(id);

    const { status: statusSoli } = solicitation;

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
