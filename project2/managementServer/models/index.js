const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, {
    // keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

module.exports.Employee = require('./employee');
module.exports.Case = require('./case');
module.exports.Hr = require('./hr');