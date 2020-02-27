const router = require('koa-router')();
const { Movie, Link, sequelize } = require('../database/index');

const utils = require('../utils/index');

router.get('/', async (ctx, next) => {
  try {
    let ret = await Movie.findAndCountAll({
      include: [
        {
          association: Movie.Links,
          attributes: ['link']
        }
      ],
      order: [[Link, 'id', 'ASC']]
    });
    ctx.body = ret;
  } catch (err) {
    ctx.body = err.message || err;
  }
});

router.get('/detail/:id', async (ctx, next) => {
  try {
    let movie = await Movie.findByPk(ctx.params.id, {
      include: [Link]
    });
    ctx.body = movie;
  } catch (err) {
    ctx.body = err.message || err;
  }
});

router.get('/getOne', async (ctx, next) => {
  try {
    let movie = await Movie.findOne({
      where: ctx.query,
      include: [
        {
          model: Link,
          as: 'links',
          attributes: ['link']
        }
      ]
    });
    ctx.body = movie;
  } catch (err) {
    ctx.body = err.message || err;
  }
});

router.get('/getOne1', async (ctx, next) => {
  try {
    let movie = await Movie.findOne({
      where: ctx.query,
      include: [
        {
          model: Link,
          as: 'links',
          attributes: ['link']
        }
      ],
      attributes: [
        'id',
        'name',
        'alias_name',
        'resolution_w',
        'resolution_h',
        'classify',
        'country',
        'language',
        'publish_date',
        'file_format'
      ]
    });
    ctx.body = movie;
  } catch (err) {
    ctx.body = err.message || err;
  }
});

router.get('/countAll', async (ctx, next) => {
  try {
    let count = await Movie.count();
    ctx.body = {
      count
    };
  } catch (err) {
    ctx.body = {
      msg: err.message
    };
  }
});

router.get('/countFilter', async (ctx, next) => {
  try {
    let count = await Movie.count({
      where: ctx.query,
      attributes: ['id', 'name', 'classify', 'publish_date']
    });
    ctx.body = {
      count
    };
  } catch (err) {
    ctx.body = {
      msg: error.message
    };
  }
});

router.get('/min', async (ctx, next) => {
  try {
    let min = await Movie.min('file_size');
    ctx.body = {
      min: min.toFixed(2)
    };
  } catch (err) {
    ctx.body = {
      msg: err.message || err
    };
  }
});

router.get('/max', async (ctx, next) => {
  try {
    let max = await Movie.max('file_size', {
      where: ctx.query
    });
    ctx.body = {
      max: max.toFixed(2)
    };
  } catch (err) {
    ctx.body = {
      msg: err.message
    };
  }
});

router.get('/sum', async (ctx, next) => {
  let field = ctx.query.field;
  delete ctx.query.field;
  let query = ctx.query;
  try {
    let sum = await Movie.sum(field, {
      where: query
    });
    ctx.body = {
      sum: sum.toFixed(2)
    };
  } catch (err) {
    ctx.body = {
      msg: err.message || err
    };
  }
});

router.get('/list', async (ctx, next) => {
  try {
    let movie = await Movie.findAll({
      include: [
        {
          model: Link,
          as: 'links',
          attributes: ['link']
        }
      ]
    });
    ctx.body = movie;
  } catch (err) {
    ctx.body = {
      msg: error.message
    };
  }
});

router.get('/list/alias', async (ctx, next) => {
  try {
    let movie = await Movie.all({
      include: [
        {
          model: Link,
          attributes: ['link']
        }
      ]
    });
    ctx.body = movie;
  } catch (err) {
    ctx.body = {
      msg: err.message
    };
  }
});

router.get('/latest', async (ctx, next) => {
  try {
    let movies = await Movie.findAll({
      attributes: ['id', 'name', 'publishDate'],
      order: [['publishDate', 'DESC']],
      limit: +ctx.query.limit
    });
    ctx.body = movies;
  } catch (err) {
    ctx.body = {
      msg: err.messaeg || err
    };
  }
});

router.get('/hot', async (ctx, next) => {
  try {
    let movies = await Movie.findAll({
      attributes: ['id', 'name', 'publishDate'],
      order: [['publishDate', 'DESC']],
      limit: +ctx.query.limit
    });
    ctx.body = movies;
  } catch (err) {
    ctx.body = {
      msg: err.messaeg || err
    };
  }
});

router.get('/page', async (ctx, next) => {
  try {
    let movies = await Movie.findAll({
      attributes: ['id', 'name', 'publishDate', 'imgUrl'],
      order: [['publishDate', 'DESC']],
      limit: +ctx.query.limit,
      offset: +ctx.query.offset
    });
    let count = await Movie.count();
    ctx.body = {
      count: count,
      movies: movies
    };
  } catch (err) {
    ctx.body = {
      msg: err.message || err
    };
  }
});

router.get('/classify/:classify', async (ctx, next) => {
  try {
    let movies = await Movie.findAndCountAll({
      attributes: ['id', 'name', 'publishDate', 'imgUrl'],
      limit: +ctx.query.limit,
      offset: +ctx.query.offset,
      where: {
        classify: ctx.params.classify
      }
    });
    ctx.body = {
      count: movies.count,
      movies: movies.rows
    };
  } catch (err) {
    ctx.body = {
      msg: err.message
    };
  }
});

module.exports = router;
