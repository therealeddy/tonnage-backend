import { Op } from 'sequelize';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from 'date-fns';
import Solicitation from '../models/Solicitation';
import Transaction from '../models/Transaction';

class ManagementReport {
  async index(req, res) {
    const {
      count: total,
      rows: rowsThisTotal,
    } = await Solicitation.findAndCountAll({
      attributes: [],
      include: [
        {
          model: Transaction,
          as: 'transaction',
          attributes: ['price_total'],
        },
      ],
    });

    const {
      count: thisMonth,
      rows: rowsThisMonth,
    } = await Solicitation.findAndCountAll({
      attributes: [],
      where: {
        created_at: {
          [Op.between]: [startOfMonth(new Date()), endOfMonth(new Date())],
        },
      },
      include: [
        {
          model: Transaction,
          as: 'transaction',
          attributes: ['price_total'],
        },
      ],
    });

    const {
      count: thisWeek,
      rows: rowsThisWeek,
    } = await Solicitation.findAndCountAll({
      attributes: [],
      where: {
        created_at: {
          [Op.between]: [startOfWeek(new Date()), endOfWeek(new Date())],
        },
      },
      include: [
        {
          model: Transaction,
          as: 'transaction',
          attributes: ['price_total'],
        },
      ],
    });

    const {
      count: thisDay,
      rows: rowsThisDay,
    } = await Solicitation.findAndCountAll({
      attributes: [],
      where: {
        created_at: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
      include: [
        {
          model: Transaction,
          as: 'transaction',
          attributes: ['price_total'],
        },
      ],
    });

    return res.json({
      total,
      thisMonth,
      thisWeek,
      thisDay,
      rowsThisTotal,
      rowsThisMonth,
      rowsThisWeek,
      rowsThisDay,
    });
  }
}

export default new ManagementReport();
