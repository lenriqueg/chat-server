const type = require('sequelize');
const { sequelize } = require('../connect');

const Log = sequelize.define('notification', {
    user_id: {
        type: type.INTEGER
    },
    action: {
        type: type.TEXT
    },
    created_at: {
        type: type.DATE,
        defaultValue: type.NOW
    },
}, { timestamps: false });

Log.sync();

module.exports.Log = Log;
