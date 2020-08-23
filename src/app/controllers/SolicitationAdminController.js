import Solicitation from '../models/Solicitation';
import Route from '../models/Route';
import User from '../models/User';
import History from '../models/History';

class SolicitationAdminController {
  async index(req, res) {
    const {
      paged = 1,
      status = null,
      id_user = null,
      id_user_trucker = null,
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
      limit: 5,
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

    const { status: statusSoli } = solicitation;

    await solicitation.update(body);

    if (statusSoli !== status) {
      await History.create({
        id_solicitation: solicitation.id,
        action: status,
      });
    }

    return res.json({ success: 'Solicitação atualizada com sucesso!' });
  }
}

export default new SolicitationAdminController();
