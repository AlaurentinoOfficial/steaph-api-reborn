var mongoose = require('mongoose')

exports.MongoDB = false;

exports.DbConfig = (link) => {
    mongoose.connect(link)

    // Mongoose log
    mongoose.connection.on('connected', () => {
        console.log('\n> Database connected!\n')
        MongoDB = true;
    });

    mongoose.connection.on('error', (err) => {
        console.log('\n> Error - Database: ' + err + '\n')
    });

    mongoose.connection.on('disconnected', () => {
        console.log('\n> Database disconnected!\n')
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('\n> Closing application!\n')
            process.exit(0)
        });
    });
}