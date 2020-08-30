import Card from '../models/Card';

class CardController {
  async index(req, res) {
    const card = await Card.findOne({
      id_user: req.userId,
    });

    if (!card) {
      return res.json({ error: 'Cartão cadastrado!' });
    }

    return res.json(card);
  }

  async store(req, res) {
    const { numberCard } = req.body;

    const card = await Card.create({
      id_user: req.userId,
      number: numberCard,
    });

    return res.json(card);
  }

  async delete(req, res) {
    const card = await Card.findOne({
      id_user: req.userId,
    });

    await card.destroy();

    return res.json({ success: 'Cartão deletado com sucesso!' });
  }
}

export default new CardController();
