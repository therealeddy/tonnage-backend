import Configuration from '../models/Configuration';

class ConfigurationController {
  async index(req, res) {
    const price = await Configuration.findOne({
      where: {
        type: 'price',
      },
      attributes: ['price_per_kilometer'],
    });

    return res.json(price);
  }

  async update(req, res) {
    const { body } = req;

    const price = await Configuration.findOne({
      where: {
        type: 'price',
      },
    });

    await price.update(body);

    return res.json({ success: 'Preço atualizado com sucesso!' });
  }
}

export default new ConfigurationController();
