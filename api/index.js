const express = require("express");
const cors = require("cors");
const db = require('./db/db');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

app.get("/api/students", function(req, res) {
    db.query('SELECT * FROM students', function (err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        return res.status(200).json(results)
    })
})

app.get("/api/students/:id", function (req, res) {
    db.query('SELECT * FROM students WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

app.post("/api/students", function (req, res) {
    const body = req.body
    const values = `('${body.name}', '${body.entrynumber}', '${body.email}','${body.contactnumber}','${body.homecity}')`;
    db.query('INSERT INTO students (name, entrynumber, email, contactnumber, homecity ) VALUES ' + values, function (err) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        // db.query("SELECT * FROM students LIMIT 1 ORDER BY id desc;", (e, result) => {
        db.query("SELECT * FROM students WHERE id = LAST_INSERT_ID();", (e, result) => {
            if (e) {
                return res.status(400).json({ error: e });
            }
            return res.status(200).json(result[0])
        })
    })
})

app.patch("/api/students/:id", function (req, res) {
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

app.delete("/api/students/:id", function (req, res) {
    db.query('DELETE FROM students WHERE id=' + req.params.id, function (err, results) {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(results)
    })
})

const port = 3000;
app.listen(port, (req, res) => console.log(`Listening at port ${port}`));
