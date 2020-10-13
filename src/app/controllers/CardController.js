import pagarme from 'pagarme';
import Card from '../models/Card';

class CardController {
  async index(req, res) {
    const card = await Card.findOne({
      where: {
        id_user: req.userId,
      },
    });

    if (!card) {
      return res.json({ error: 'Cartão cadastrado!' });
    }

    return res.json(card);
  }

  async store(req, res) {
    const { numberCard } = req.body;

    const cardValidation = await pagarme.validate({
      card: {
        card_number: numberCard,
      },
    });

    if (!cardValidation.card.card_number) {
      return res.json({
        error: 'Cartão invalido, verifique as informações cadastradas!',
      });
    }

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
