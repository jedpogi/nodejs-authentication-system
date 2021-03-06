'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose'); //.set('debug', true);
const basename = path.basename(__filename);
const db = {};

const Schema = mongoose.Schema;

//move to env
mongoose.connect('mongodb://localhost:27017/auth', {
    useUnifiedTopology: true,
});

fs.readdirSync(__dirname)
    .filter((fileName) => {
        return (
            fileName.indexOf('.') !== 0 &&
            fileName !== basename &&
            fileName.slice(-3) === '.js'
        );
    })
    .forEach((fileName) => {
        const modelSchema = require(path.join(__dirname, fileName));

        // user.js will be user now
        fileName = fileName.split('.')[0];
        db[fileName] = mongoose.model(fileName, modelSchema);
    });

module.exports = db;
