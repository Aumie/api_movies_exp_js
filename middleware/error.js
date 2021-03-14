const winston = require('winston');

module.exports = function (err, req, res, next) {
    //log the exception
    //winston.log('error', err.message);
    winston.error(err.message, ex);
    //if error outside the context of express this will be not executed
    res.status(500).send('Something failed');
}