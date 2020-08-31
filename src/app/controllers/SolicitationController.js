import Solicitation from '../models/Solicitation';
import Route from '../models/Route';
import History from '../models/History';
import Load from '../models/Load';

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
          model: Load,
          as: 'load',
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
          model: Load,
          as: 'load',
          attributes: ['name', 'description', 'price'],
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
      description,
      destination_address,
      destination_latitude,
      destination_longitude,
      origin_address,
      origin_latitude,
      origin_longitude,
      id_load,
    } = body;

    const route = await Route.create({
      destination_address,
      destination_latitude,
      destination_longitude,
      origin_address,
      origin_latitude,
      origin_longitude,
    });

    const solicitation = await Solicitation.create({
      id_user: req.userId,
      id_route: route.id,
      status: 'create',
      description,
      id_load,
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
