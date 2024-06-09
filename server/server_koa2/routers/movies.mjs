import Router from 'koa-router';
import { isNull } from 'lodash-es';
import { Movie, Link } from '../models/index.mjs';
import { sequelize } from '../database/index.mjs';

const router = Router();

router.post('/', async (ctx, next) => {
  try {
    let movie = await Movie.create(ctx.request.body, {
      include: [
        {
          model: Link,
          as: 'links'
        }
      ]
    });
    ctx.body = movie;
  } catch (err) {
    ctx.body = err.message || err;
  }
});

router.put('/:id', async (ctx, next) => {
  let body = Object.assign({}, ctx.request.body, {
    id: ctx.params.id
  });
  try {
    let movie = await Movie.findByPk(ctx.params.id);
    if (isNull(movie)) {
      throw `id 为 ${ctx.params.id} 的 movie 不存在`;
    }
    await movie.destroy();
    let rows = await Movie.create(body, {
      include: [
        {
          model: Link,
          as: 'links'
        }
      ]
    });
    ctx.body = rows;
  } catch (err) {
    ctx.body = err.message || err;
  }
});

router.delete('/:id', async (ctx, next) => {
  try {
    let movie = Movie.destroy({
      where: {
        id: ctx.params.id
      }
    });
    ctx.body = {
      message: 'success'
    };
  } catch (err) {
    ctx.body = err.messaeg || err;
  }
});

router.get('/describe', async (ctx, next) => {
  try {
    let describe = Movie.describe();
    ctx.body = describe;
  } catch (err) {
    ctx.body = {
      msg: err.message
    };
  }
});

/**
 *    have some problems...
 */
router.post('/batch/add', async (ctx, next) => {
  try {
    await sequelize.transaction(t => {
      return Movie.bulkCreate(ctx.req.body, {
        transaction: t
      });
    });
    let movies = await Movie.findAll({
      include: [
        {
          model: Link,
          as: 'links'
        }
      ]
    });
    ctx.body = movies;
  } catch (err) {
    ctx.body = {
      msg: err.message
    };
  }
});

router.post('/batch/delete', async (ctx, next) => {
  try {
    await Movie.destroy({
      where: {
        id: {
          $in: ctx.req.body.id
        }
      }
    });
    ctx.body = {
      msg: 'success'
    };
  } catch (err) {
    ctx.body = {
      msg: err.messaeg || err
    };
  }
});

export default router;
