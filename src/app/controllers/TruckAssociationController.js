import Truck from '../models/Truck';

class TruckAssociationController {
  async index(req, res) {
    const trucks = await Truck.findAll({
      where: {
        id_user_trucker: null,
      },
      order: [['id', 'DESC']],
    });

    return res.json(trucks);
  }

  async show(req, res) {
    const { id: id_user_trucker } = req.params;

    const trucks = await Truck.findAll({
      where: {
        id_user_trucker: null,
      },
      order: [['id', 'DESC']],
    });

    const trucksUser = await Truck.findAll({
      where: {
        id_user_trucker,
      },
      order: [['id', 'DESC']],
    });

    return res.json([...trucksUser, ...trucks]);
  }
}

export default new TruckAssociationController();
