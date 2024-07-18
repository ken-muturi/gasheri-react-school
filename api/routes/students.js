const express = require("express");
const route = express.Router();
const db = require('../utils/db');


route.get("/students", function (req, res) {
    db.query('SELECT * FROM students', function (err, results) {
        if (err) {
            return res.status(400).json({ error: err.sqlMessage });
        }
        return res.status(200).json(results)
    })
})

route.get("/students/search", function (req, res) {
    const search = req.query.q;
    let where = '';
    if (search) {
        where = `WHERE name LIKE '%${search}%' OR entrynumber LIKE '%${search}%' OR email LIKE '%${search}%' OR contactnumber LIKE '%${search}%' OR homecity LIKE '%${search}%'`
    }
    db.query(`SELECT * FROM students ${where}`, (err, results) => {
        if (err) {
            return res.status(400).json({ error: err.sqlMessage });
        }
        else if (results.length) {
            return res.status(200).json(results)
        }
        return res.status(400).json({ error: "no records found" });
    })
})

route.get("/students/:id", function (req, res) {
    db.query('SELECT * FROM students WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err.sqlMessage });
        }
        return res.status(200).json(results)
    })
})

route.post("/students", function (req, res) {
    const body = req.body
    const values = `('${body.name}', '${body.entrynumber}', '${body.email}','${body.contactnumber}','${body.homecity}')`;
    db.query('INSERT INTO students (name, entrynumber, email, contactnumber, homecity ) VALUES ' + values, function (err) {
        if (err) {
            return res.status(400).json({ error: err.sqlMessage });
        }
        // db.query("SELECT * FROM students LIMIT 1 ORDER BY id desc;", (e, result) => {
        db.query("SELECT * FROM students WHERE id = LAST_INSERT_ID();", (e, result) => {
            if (e) {
                return res.status(400).json({ error: e.sqlMessage });
            }
            return res.status(200).json(result[0])
        })
    })
})

route.patch("/students/:id", function (req, res) {
    const body = req.body
    const updateColumns = Object.entries(body).map(b => {
        const [column, value] = b;
        return `${column} = '${value}'`
    });

    db.query('UPDATE students SET ' + updateColumns.join(", ") + 'WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

route.delete("/students/:id", function (req, res) {
    db.query('DELETE FROM students WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

module.exports = route