const db = require('../models');

db.User.create({
    firstName: 'testuser92',
    lastName: 'testuser',
    email: 'testuser@test.com',
    password: 'testpassword',
    role: 'employee'
}).then(user => {
    console.log('User created:', user);
}).catch(err => {
    console.error('Error creating user:', err);
});
