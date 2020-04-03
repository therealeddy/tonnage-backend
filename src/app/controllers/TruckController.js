import Truck from '../models/Truck';

class TruckController {
  async index(req, res) {
    const { paged = 1 } = req.query;

    const trucks = await Truck.findAndCountAll();

    const { count } = trucks;

    const rows = await Truck.findAll({
      order: [['id', 'DESC']],
      limit: 5,
      offset: (paged - 1) * 5,
    });

    return res.json({ rows, count });
  }

  async show(req, res) {
    const { id } = req.params;

    const truck = await Truck.findByPk(id);

    if (!truck) {
      return res.json({ error: 'Caminhão não encontrado!' });
    }

    return res.json(truck);
  }

  async store(req, res) {
    const { body } = req;

    const exists = await Truck.findOne({
      where: {
        board: body.board,
      },
    });

    if (exists) {
      return res.json({
        error: 'Caminhão já cadastrado na plataforma!',
      });
    }

    await Truck.create(body);

    return res.json({ success: 'Caminhão cadastrado com sucesso!' });
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    const truck = await Truck.findByPk(id);

    if (!truck) {
      return res.json({ error: 'Caminhão não encontrado!' });
    }

    if (body.board !== truck.board) {
      const exists = await Truck.findOne({
        where: { board: body.board },
      });

      if (exists) {
        return res.json({ error: 'Caminhão já cadastrado na plataforma!' });
      }
    }

    await truck.update(body);

    return res.json({ success: 'Caminhão atualizado com sucesso!' });
  }

  async delete(req, res) {
    const { id } = req.params;

    const truck = await Truck.findByPk(id);

    if (!truck) {
      return res.json({ error: 'Caminhão não encontrado!' });
    }

    await truck.destroy();

    return res.json({ success: 'Caminhão deletado com sucesso!' });
  }
}

export default new TruckController();
