import User from '../models/User';
import Role from '../models/Role';

class UserController {
  async index(req, res) {
    const { paged = 1, role } = req.query;

    const { rows, count } = await Role.findAndCountAll({
      where: {
        role,
      },
      attributes: [],
      order: [['id', 'DESC']],
      limit: 5,
      offset: (paged - 1) * 5,
      include: [
        {
          model: User,
          as: 'user',
          order: [['id', 'DESC']],
          attributes: ['id', 'nickname', 'name', 'email', 'cpf', 'tel'],
        },
      ],
    });

    return res.json({ rows, count });
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.json({ error: 'Usuário não encontrado!' });
    }

    const { nickname, name, email, cpf, tel } = user;

    return res.json({ nickname, name, email, cpf, tel });
  }

  async store(req, res) {
    const { nickname, email, cpf, role } = req.body;

    const existsNick = await User.findOne({
      where: {
        nickname,
      },
    });

    if (existsNick) {
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

    if (existsEmail) {
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

    if (existsCpf) {
      return res.json({
        error: 'Já existe um usuário cadastrado com este CPF, tente novamente!',
      });
    }

    const { id: id_user } = await User.create(req.body);

    await Role.create({
      id_user,
      role,
    });

    return res.json({ success: 'Usuário cadastrado com sucesso!' });
  }

  async update(req, res) {
    const { id } = req.params;
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

    return res.json({ success: 'Usuário atualizado com sucesso!' });
  }

  async delete(req, res) {
    const { id: id_user } = req.params;

    const user = await User.findByPk(id_user);

    if (!user) {
      return res.json({ error: 'Usuário não encontrado!' });
    }

    const role = await Role.findOne({
      where: {
        id_user,
      },
    });

    await role.destroy();
    await user.destroy();

    return res.json({ success: 'Usuário deletado com sucesso!' });
  }
}

export default new UserController();
