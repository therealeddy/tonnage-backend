import History from '../models/History';
import User from '../models/User';

class HistoryController {
  async index(req, res) {
    const { paged = 1 } = req.query;

    const { rows, count } = await History.findAndCountAll({
      order: [['created_at', 'DESC']],
      limit: 5,
      offset: (paged - 1) * 5,
      attributes: ['action', 'id_solicitation', 'created_at'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    return res.json({ rows, count });
  }

  async show(req, res) {
    const { id } = req.params;

    const historys = await History.findAll({
      order: [['created_at', 'DESC']],
      attributes: ['action', 'id_solicitation', 'created_at'],
      where: { id_solicitation: id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    return res.json(historys);
  }
}

export default new HistoryController();
