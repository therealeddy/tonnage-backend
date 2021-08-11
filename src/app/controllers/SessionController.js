import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { nickname, password } = req.body;

    const user = await User.findOne({
      where: { nickname, password },
    });

    if (!user) {
      return res.json({ error: 'Usúario não encontrado!' });
    }

    const { id, nickname: nick } = user;

    const { role } = await Role.findOne({
      where: { id_user: id },
    });

    return res.json({
      user: {
        nickname: nick,
        role,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
