const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { ensureAuthenticated } = require('../routes/middlewares');

router.post('/', ensureAuthenticated, (req, res) => {
    User.create(req.body)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });

});

// GET /users - Get all users
router.get('/', (req, res) => {
    User.findAll()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// GET /users/:id - Get a single user by id
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// POST /users - Create a new user
router.post('/', (req, res) => {
    User.create(req.body)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// PUT /users/:id - Update a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
        })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });

});

// DELETE /users/:id - Delete a user
router.delete('/:id', (req, res) => {
    User.destroy({  where: { id: req.params.id } })
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

module.exports = router;