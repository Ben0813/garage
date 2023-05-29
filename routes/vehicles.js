const express = require('express');
const router = express.Router();
const { Vehicle } = require('../models');

// GET /vehicles - Get all vehicles
router.get('/', (req, res) => {
    Vehicle.findAll()
        .then(vehicles => {
            res.json(vehicles);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// GET /vehicles/:id - Get a single vehicle by id
router.get('/:id', (req, res) => {
    Vehicle.findByPk(req.params.id)
        .then(vehicle => {
            res.json(vehicle);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// POST /vehicles - Create a new vehicle
router.post('/', (req, res) => {
    Vehicle.create(req.body)
        .then(vehicle => {
            res.json(vehicle);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// PUT /vehicles/:id - Update a vehicle
router.put('/:id', (req, res) => {
    Vehicle.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
        })
        .then(vehicle => {
            res.json(vehicle);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });

});

// DELETE /vehicles/:id - Delete a vehicle
router.delete('/:id', (req, res) => {
    Vehicle.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(vehicle => {
            res.json(vehicle);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });

}   );

module.exports = router;