const express = require('express');
const router = express.Router();
const { Service } = require('../models');

// GET /services - Get all services
router.get('/', (req, res) => {
    Service.findAll()
        .then(services => {
            res.json(services);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// GET /services/:id - Get a single service by id
router.get('/:id', (req, res) => {
    Service.findByPk(req.params.id)
        .then(service => {
            res.json(service);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// POST /services - Create a new service
router.post('/', (req, res) => {
    Service.create(req.body)
        .then(service => {
            res.json(service);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// PUT /services/:id - Update a service
router.put('/:id', (req, res) => {
    Service.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
        })
        .then(service => {
            res.json(service);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// DELETE /services/:id - Delete a service
router.delete('/:id', (req, res) => {
    Service.destroy({  where: { id: req.params.id } })
        .then(service => {
            res.json(service);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

module.exports = router;