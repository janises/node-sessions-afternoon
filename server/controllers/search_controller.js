const swag = require('../models/swag.js');

module.exports = {
    search: (req, res, next) => {
        if(!req.query.category) {
            res.status(200).send(swag);
       } else {
            let result = swag.filter(item => {
                return item.category.toLowerCase() === req.query.category.toLowerCase()
            })    
            res.status(200).send(result);
       }
       
    }
    
}