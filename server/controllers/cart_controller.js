const swag = require('../models/swag.js');


module.exports = {
    add: (req, res, next) => {
        let index = req.session.user.cart.findIndex(item => item.id === +req.query.id);
        
        if(index < 0) {
            const item = swag.find(item => item.id === +req.query.id)
            req.session.user.cart.push(item);
            req.session.user.total += item.price;
        }
        res.status(200).send(req.session.user);
    },
    delete: (req, res, next) => {
        const item = req.session.user.cart.find(item => item.id === +req.query.id)
        if(item) {
            const i = req.session.user.cart.findIndex(swag => swag.id === +req.query.id);
            req.session.user.cart.splice(i, 1);
            req.session.user.total -= item.price;
        }
        res.status(200).send(req.session.user);
    },
    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user);
    }
}