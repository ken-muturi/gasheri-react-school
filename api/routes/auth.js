const express = require("express");
const route = express.Router();
const db = require('../utils/db');
const { hashPassword } = require('../utils/util');

route.post('/login', (req, res) => {
    const { email, password } = req.body;
    const pass = hashPassword(password);
    db.query(`SELECT firstname, password, othernames, active FROM users WHERE email='${email}'`, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err.sqlMessage });
        }

        if (results.length) {
            const user = results[0]
            if (user.password === pass) {
                return res.status(200).json({ firstname: user.firstname, othernames: user.othernames, active: user.active })
            }
            return res.status(400).json({ error: "Could not login, Invalid Username or password." })
        }
        return res.status(400).json({ error: "Could not login, User not found in the database" })
    })
});

route.post("/signup", function (req, res) {
    const { password, firstname, othernames, email } = req.body
    console.log({ body: req.body })
    const pass = hashPassword(password)
    const values = `('${firstname}', '${othernames}', '${email}','${pass}')`;
    db.query('INSERT INTO users (firstname, othernames, email, password ) VALUES ' + values, function (err) {
        if (err) {
            return res.status(400).json({ error: err.sqlMessage });
        }
        db.query("SELECT firstname, othernames, email, active FROM users WHERE id = LAST_INSERT_ID();", (e, result) => {
            if (e) {
                return res.status(400).json({ error: e.sqlMessage });
            }
            return res.status(200).json(result[0])
        })
    })
})

route.get("/once-update", function (req, res) {
    db.query('SELECT * FROM users', function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        results.forEach(user => {
            const password = hashPassword(user.password);
            db.query(`UPDATE users set password='${password}' WHERE id =${user.id};`, (e, result) => {
                if (e) {
                    console.log({ error: e });
                }
            })
        });
        return res.status(200).json({ "updated": "updated the user passwords" })
    })
})

module.exports = route