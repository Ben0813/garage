function ensureAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

function ensureRole(role) {
    return function(req, res, next) {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    }
}

module.exports = {
    ensureAuthenticated,
    ensureRole
};
