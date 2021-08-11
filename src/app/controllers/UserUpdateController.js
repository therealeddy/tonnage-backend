import User from '../models/User';

class UserUpdateController {
  async index(req, res) {
    const { userId: id } = req;

    const user = await User.findByPk(id);

    if (!user) {
      return res.json({ error: 'Usuário não encontrado!' });
    }

    const { nickname, name, email, cpf, tel } = user;

    return res.json({ nickname, name, email, cpf, tel });
  }

  async update(req, res) {
    const { userId: id } = req;

    const { body } = req;

    const { nickname, email, cpf } = body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.json({ error: 'Usuario não encontrado!' });
    }

    const existsNick = await User.findOne({
      where: {
        nickname,
      },
    });

    if (existsNick && existsNick.id !== Number(id)) {
      return res.json({
        error:
          'Já existe um usuário cadastrado com este nome, tente novamente!',
      });
    }

    const existsEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (existsEmail && existsEmail.id !== Number(id)) {
      return res.json({
        error:
          'Já existe um usuário cadastrado com este email, tente novamente!',
      });
    }

    const existsCpf = await User.findOne({
      where: {
        cpf,
      },
    });

    if (existsCpf && existsCpf.id !== Number(id)) {
      return res.json({
        error: 'Já existe um usuário cadastrado com este CPF, tente novamente!',
      });
    }

    await user.update(body);

    return res.json({
      success: 'Suas informações foram atualizadas com sucesso!',
    });
  }
}

export default new UserUpdateController();
