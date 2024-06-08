import { Router } from 'express';
import { sequelize } from "../database/index.mjs";
import {
  Movie,
  Link,
} from '../models/index.mjs';
import { isNull } from '../utils/index.mjs';


const router = Router();

router.get('/', (req, res) => {
  Movie.findAndCountAll({
    include: [{
      association: Movie.Links,
      attributes: ['link'],
    }],
    order: [
      [Link, 'id', 'ASC']
    ]
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).json(err.message || err);
    });
});

router.get('/detail/:id', (req, res) => {
  Movie.findById(req.params.id, {
    include: [Link]
  })
    .then(movie => {
      res.json(movie)
    })
    .catch(err => res.status(400).json({ msg: err.message }));
})

router.post('/', (req, res) => {
  Movie.create(req.body, {
    include: [{
      association: Movie.Links,
    }]
  })
    .then((movie) => {
      res.json(movie)
    })
    .catch((err) => {
      res.status(400).json(err.message || err);
    })
});

router.put('/:id', (req, res) => {
  let body = Object.assign({}, req.body, { id: req.params.id })
  Movie.findById(req.params.id).then(movie => {
    if (utils.isNull(movie)) {
      throw (`id 为 ${req.params.id} 的 movie 不存在`);
    }
    return movie.destroy()
      .then(() => {
        return Movie.create(body, {
          include: [Link]
        });
      });
  })
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      res.status(400).json({ message: err.message || err });
    })
});

router.delete('/:id', (req, res) => {
  Movie.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((movie) => {
      res.json({
        msg: 'success'
      });
    })
    .catch(err => {
      res.status(400).json(err.message || err)
    });
});

router.get('/getOne', (req, res) => {
  Movie.findOne({
    where: req.query,
    include: [{
      model: Link,
      as: 'links',
      attributes: ['link']
    }]
  })
    .then((movie) => {
      res.json({
        movie
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: err.message
      });
    });
});

router.get('/getOne1', (req, res) => {
  Movie.findOne({
    where: req.query,
    include: [{
      model: Link,
      as: 'links',
      attributes: ['link']
    }],
    attributes: ['id', 'name', 'alias_name', 'resolution_w', "resolution_h", 'classify', 'country', 'language', 'publish_date', 'file_format']
  })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      res.status(400).json({
        'msg': err.message
      });
    });
});

router.get('/countAll', (req, res) => {
  Movie.count()
    .then(count => {
      res.json({
        count
      });
    })
    .catch(error => {
      res.json({
        msg: error.message
      });
    });
});

router.get('/countFilter', (req, res) => {
  Movie.count({
    where: req.query,
    attributes: ['id', 'name', 'classify', 'publish_date']
  })
    .then(count => {
      res.status(200).json({
        count
      });
    })
    .catch(error => {
      res.json({
        msg: error.message
      });
    });
});

router.get('/min', (req, res) => {
  Movie.min('file_size')
    .then(min => {
      res.json({
        min: min.toFixed(2)
      });
    })
    .catch(err => res.json({
      msg: err.message
    }));
});

router.get('/max', (req, res) => {
  Movie.max('file_size', {
    where: req.query
  })
    .then(max => {
      res.json({
        max: max.toFixed(2)
      });
    })
    .catch(err => res.json({
      msg: err.message
    }));
});

router.get('/sum', (req, res) => {
  let field = req.query.field;
  delete req.query.field;
  let query = req.query;
  Movie.sum(field, {
    where: query
  })
    .then(sum => res.json({
      sum: sum.toFixed(2)
    }))
    .catch(error => res.json({
      msg: error.message
    }));
});

router.get('/list', (req, res) => {
  Movie.findAll({
    include: [{
      model: Link,
      as: 'links',
      attributes: ['link']
    }]
  })
    .then(movie => res.json(movie))
    .catch(error => res.json({
      msg: error.message
    }));
});

router.get('/list/alias', (req, res) => {
  Movie.all({
    include: [{
      model: Link,
      attributes: ['link']
    }]
  })
    .then(movie => res.json(movie))
    .catch(err => res.json({
      msg: err.message
    }));
});

router.get('/describe', (req, res) => {
  Movie.describe()
    .then(describe => res.json(describe))
    .catch(error => res.json(error.message));
});

/**
 *    have some problems...
 */
router.post('/batch/add', (req, res) => {
  return sequelize.transaction((t) => {
    return Movie.bulkCreate(req.body, { transaction: t })
  })
    .then(() => {
      return Movie.findAll({
        include: [{
          model: Link,
          attributes: ['link']
        }]
      });
    })
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      res.json({
        msg: err.message
      });
    });
});

router.post('/batch/delete', (req, res) => {
  Movie.destroy({
    where: {
      id: {
        $in: req.body.id
      }
    }
  })
    .then(() => {
      res.json({
        msg: 'success'
      });
    })
    .catch((error) => {
      res.json({
        msg: error.message
      });
    })
});

router.get('/latest', (req, res) => {
  Movie.findAll({
    attributes: ['id', 'name', 'publishDate'],
    order: [["publishDate", "DESC"]],
    limit: +req.query.limit
  }).then(movies => res.json(movies))
    .catch(err => res.json({ msg: err.message }));
});

router.get('/hot', (req, res) => {
  Movie.findAll({
    attributes: ['id', 'name', 'publishDate'],
    order: [['publishDate', 'DESC']],
    limit: +req.query.limit
  }).then(movies => res.json(movies))
    .catch(err => res.status(400).json({ msg: err.message }));
});

router.get('/page', (req, res) => {
  Movie.findAll({
    attributes: ['id', 'name', 'publishDate', 'imgUrl'],
    order: [['publishDate', 'DESC']],
    limit: +req.query.limit,
    offset: +req.query.offset
  }).then(movies => {
    return Movie.count()
      .then(count => res.json({ count: count, movies: movies }));
  })
    .catch(err => res.status(400).json({ msg: err.message }));
});

router.get('/classify/:classify', (req, res) => {
  Movie.findAll({
    attributes: ['id', 'name', 'publishDate', 'imgUrl'],
    limit: +req.query.limit,
    offset: +req.query.offset,
    where: {
      classify: req.params.classify
    }
  })
    .then(movies => {
      return Movie.count()
        .then(count => res.json({ count: count, movies: movies }));
    })
    .catch(err => res.status(400).json({ msg: err.message }));
});

export default router;
