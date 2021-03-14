const mongoose = require('mongoose');
const { logger } = require('./logging');

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => logger.info('Connected to MongoDB...'));
        //.catch(err => console.error('Could not connect to MongoDB...'));
};