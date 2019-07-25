import express from 'express';
let router = express.Router();
import {User} from '../database/index' ;

router.get('/', (req, res) => {
    User.findAndCountAll({
        attributes: ['id', 'username', 'password', 'tel', 'email', 'permission', 'nickname']
        // attributes: {
        //     include: ['id', 'username', 'password', 'tel', 'email', 'permission', 'nickname'],
        //     exclude: ['created_at', 'update_timestamp', 'destroy_time']
        // }
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(400).json(err.message || err);
    });
});

router.post('/', (req, res) => {
    User.create(req.body)
        .then(user => {
            req.session.regenerate(err => {
                if(err) {
                    return res.json({ret_code: 2, ret_msg: err || "Login failed!"});
                }
                req.session.loginUser = user.username;
                res.json({ret_code: 0, ret_msg: '登录成功'});
            });
        })
        .catch(err => {
            res.status(400).json(err.message || err);
        });
});

router.put('/:id', (req, res) => {
    User.update(req.body, {where: {id: req.params.id}})
        .then( affectedRowsNumber => {
            res.json(req.body);
        })
        .catch(err=>{
            res.status(400).json(err.message || err);
        });
});

router.delete('/:id', (req, res) => {
    User.destroy({where: {id: req.params.id}})
        .then(()=>{
            res.json({msg: 'succedd'})
        })
        .catch(err=>{
            res.status(400).json(err.message || err);
        });
});

router.get('/permission/list', (req, res) => {
    res.json(['GUEST', 'ADMIN', 'OPERATOR'])
});

module.exports = router;