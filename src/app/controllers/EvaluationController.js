import Evaluation from '../models/Evaluation';
import Solicitation from '../models/Solicitation';

class EvaluationController {
  async store(req, res) {
    const { rating: evaluation, comment, id_solicitation } = req.body;

    const solicitation = await Solicitation.findByPk(id_solicitation);

    if (!solicitation) {
      return res.json({ error: 'Solicitação não encontrada!' });
    }

    const { id } = await Evaluation.create({
      evaluation,
      comment,
    });

    solicitation.update({
      id_evaluation: id,
    });

    return res.json({ success: 'Solicitação avaliada com sucesso!' });
  }
}

export default new EvaluationController();
