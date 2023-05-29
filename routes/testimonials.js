const express = require('express');
const router = express.Router();
const { Testimonial } = require('../models');

// GET /testimonials - Get all testimonials
router.get('/', (req, res) => {
    Testimonial.findAll()
        .then(testimonials => {
            res.json(testimonials);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// GET /testimonials/:id - Get a single testimonial by id
router.get('/:id', (req, res) => {
    Testimonial.findByPk(req.params.id)
        .then(testimonial => {
            res.json(testimonial);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// POST /testimonials - Create a new testimonial
router.post('/', (req, res) => {
    Testimonial.create(req.body)
        .then(testimonial => {
            res.json(testimonial);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });
});

// PUT /testimonials/:id - Update a testimonial
router.put('/:id', (req, res) => {
    Testimonial.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        plain: true
        })
        .then(testimonial => {
            res.json(testimonial);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });

});

// DELETE /testimonials/:id - Delete a testimonial
router.delete('/:id', (req, res) => {
    Testimonial.destroy({  where: { id: req.params.id } })
        .then(testimonial => {
            res.json(testimonial);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error'});
        });

}   );

module.exports = router;
