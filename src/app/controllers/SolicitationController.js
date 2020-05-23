import Solicitation from '../models/Solicitation';
import Route from '../models/Route';
import History from '../models/History';

class SolicitationController {
  async index(req, res) {
    const solicitation = await Solicitation.findAll({
      order: [['id', 'DESC']],
      attributes: ['id', 'status'],
      include: [
        {
          model: Route,
          as: 'route',
          attributes: ['destination_address', 'origin_address'],
        },
      ],
    });

    return res.json(solicitation);
  }

  async show(req, res) {
    const { id } = req.params;

    const solicitation = await Solicitation.findOne({
      where: { id },
      attributes: ['status'],
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
      ],
    });

    return res.json(solicitation);
  }

  async store(req, res) {
    const { body } = req;

    const route = await Route.create(body);

    const solicitation = await Solicitation.create({
      id_route: route.id,
      status: 'create',
    });

    await History.create({
      id_solicitation: solicitation.id,
      action: 'create',
    });

    return res.json({ success: 'Solicitação feita com sucesso!' });
  }

  async update(req, res) {
    const { body } = req;

    const { status } = body;

    const { id } = req.params;

    const solicitation = await Solicitation.findByPk(id);

    await solicitation.update(body);

    await History.create({
      id_solicitation: solicitation.id,
      action: status,
    });

    return res.json({ success: 'Solicitação atualizada com sucesso!' });
  }
}

export default new SolicitationController();
