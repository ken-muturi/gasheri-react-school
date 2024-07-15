const express = require("express");
const route = express.Router();
const db = require('../db/db');

route.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT firstname, othernames, active FROM users WHERE email='${email}' AND password='${password}'`, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }

        if (results.length) {
            return res.status(200).json(results[0])
        }
        return res.status(400).json({ error: "Could not login, Invalid Username or password." })
    })
});

module.exports = route