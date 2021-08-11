import Load from '../models/Load';

class LoadController {
  async index(req, res) {
    const loads = await Load.findAll({
      attributes: ['id', 'name', 'description', 'price'],
      order: [['id', 'DESC']],
    });
    return res.json(loads);
  }

  async show(req, res) {
    const { id } = req.params;

    const load = await Load.findOne({
      where: {
        id,
      },
      attributes: ['id', 'name', 'description', 'price'],
    });

    if (!load) {
      return res.json({
        error: 'Carga não encontrada!',
      });
    }

    return res.json(load);
  }

  async store(req, res) {
    const { body } = req;

    const load = await Load.create(body);

    if (!load) {
      return res.json({
        error: 'Não foi possivel cadastrar a carga! Tente novamente',
      });
    }

    return res.json({
      success: 'Carga criada com sucesso!',
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    const load = await Load.findByPk(id);

    if (!load) {
      return res.json({
        error: 'Carga não encontrada!',
      });
    }

    await load.update(body);

    return res.json({
      success: 'Carga atualizada com sucesso!',
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const load = await Load.findByPk(id);

    if (!load) {
      return res.json({
        error: 'Carga não encontrada!',
      });
    }

    await load.destroy();

    return res.json({
      success: 'Carga deletada com sucesso!',
    });
  }
}

export default new LoadController();
