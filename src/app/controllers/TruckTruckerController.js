import Truck from '../models/Truck';

class TruckTruckerController {
  async index(req, res) {
    const truck = await Truck.findOne({
      where: {
        id_user_trucker: req.userId,
      },
    });

    return res.json(truck);
  }
}

export default new TruckTruckerController();
