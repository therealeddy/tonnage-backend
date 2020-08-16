import User from '../models/User';
import Role from '../models/Role';

class UserController {
  async store(req, res) {
    const { nickname, email, cpf } = req.body;

    const existsNick = await User.findOne({
      where: {
        nickname,
      },
    });

    if (existsNick) {
      return res.json({
        error:
          'Já existe um usúario cadastrado com este nome, tente novamente!',
      });
    }

    const existsEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (existsEmail) {
      return res.json({
        error:
          'Já existe um usúario cadastrado com este email, tente novamente!',
      });
    }

    const existsCpf = await User.findOne({
      where: {
        cpf,
      },
    });

    if (existsCpf) {
      return res.json({
        error: 'Já existe um usúario cadastrado com este CPF, tente novamente!',
      });
    }

    const { id: id_user } = await User.create(req.body);

    await Role.create({
      id_user,
      role: 1,
    });

    return res.json({ success: 'Usúario cadastrado com sucesso!' });
  }
}

export default new UserController();
