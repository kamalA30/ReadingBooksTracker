const express = require('express');
const toke = require('./tokenUser');

module.exports = {
    global: (app) => {
        app.use((req, res, next) => {
            next();
        });

        app.use(express.json());
    },

    tokenUser: toke
};
