const express = require("express");
const route = express.Router();
const db = require('../db/db');

route.get("/teachers", function (req, res) {
    db.query('SELECT * FROM teachers', function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

route.get("/teachers/:id", function (req, res) {
    db.query('SELECT * FROM teachers WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

route.post("/teachers", function (req, res) {
    const body = req.body
    const values = `('${body.name}', '${body.entrynumber}', '${body.email}','${body.contactnumber}','${body.homecity}')`;
    db.query('INSERT INTO teachers (name, entrynumber, email, contactnumber, homecity ) VALUES ' + values, function (err) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        // db.query("SELECT * FROM teachers LIMIT 1 ORDER BY id desc;", (e, result) => {
        db.query("SELECT * FROM teachers WHERE id = LAST_INSERT_ID();", (e, result) => {
            if (e) {
                return res.status(400).json({ error: e });
            }
            return res.status(200).json(result[0])
        })
    })
})

route.patch("/teachers/:id", function (req, res) {
    const body = req.body
    const updateColumns = Object.entries(body).map(b => {
        const [column, value] = b;
        return `${column} = '${value}'`
    });

    db.query('UPDATE teachers SET ' + updateColumns.join(", ") + 'WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

route.delete("/teachers/:id", function (req, res) {
    db.query('DELETE FROM teachers WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

module.exports = route