const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    //work only synchronous
    /*process.on('uncaughtException', (ex) => {
        //console.log('WE GOT AN UNCAUGHT EXCEPTION');
        winston.error(ex.message, ex);
        process.exit(1);
    
    });//use winston on bottom line better */

    winston.exceptions.handle(new winston.transports.Console({ colorize: true, prettyPrint: true }), new winston.transports.File({ filename: 'uncaughtException.log' }));

    process.on('unhandledRejection', (ex) => {
        //console.log('WE GOT AN UNHANDLE REJECTION');
        //winston.error(ex.message, ex);
        //process.exit(1);
        throw ex;//winston will catch
    });


    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'info' }));

//throw new Error('Something failed during startup.');
/*const p = Promise.reject(new Error('Something failed miserably'));
p.then(() => console.log('Done'));*/

    
}

var options = {
    console: {
        level: 'info',
        json: false,
        colorize: true,
        prettyPrint: true
    }
}
var logger = new winston.createLogger({
    transports: [
        new winston.transports.Console(options.console)
    ],
    format: winston.format.combine(winston.format.colorize(),
                 winston.format.timestamp(),
                 winston.format.printf((info) => {
                         return `${info.timestamp}:[${info.level}]: ${info.message}`;
                 })
    )
    //exitOnError: false, // do not exit on handled exceptions
});

module.exports.logger = logger;