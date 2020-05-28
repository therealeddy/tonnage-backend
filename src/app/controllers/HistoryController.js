import History from '../models/History';

class HistoryController {
  async index(req, res) {
    const historys = await History.findAll({
      order: [['id', 'DESC']],
      attributes: ['action', 'id_solicitation'],
    });

    return res.json(historys);
  }

  async show(req, res) {
    const { id } = req.params;

    const historys = await History.findAll({
      order: [['id', 'DESC']],
      attributes: ['action', 'id_solicitation'],
      where: { id_solicitation: id },
    });

    return res.json(historys);
  }
}

export default new HistoryController();
