const express = require("express");
const route = express.Router();
const db = require('../db/db');

route.get("/", function (req, res) {
    db.query('SELECT * FROM users', function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

route.get("/:id", function (req, res) {
    db.query('SELECT * FROM users WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

route.post("/", function (req, res) {
    const body = req.body
    const values = `('${body.name}', '${body.entrynumber}', '${body.email}','${body.contactnumber}','${body.homecity}')`;
    db.query('INSERT INTO users (email, firstname, othernames ) VALUES ' + values, function (err) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        db.query("SELECT * FROM users WHERE id = LAST_INSERT_ID();", (e, result) => {
            if (e) {
                return res.status(400).json({ error: e });
            }
            return res.status(200).json(result[0])
        })
    })
})

route.patch("/:id", function (req, res) {
    const body = req.body
    const updateColumns = Object.entries(body).map(b => {
        const [column, value] = b;
        return `${column} = '${value}'`
    });

    db.query('UPDATE users SET ' + updateColumns.join(", ") + 'WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

route.delete("/:id", function (req, res) {
    db.query('DELETE FROM users WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

module.exports = route