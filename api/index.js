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

const port = 3000;
app.listen(port, (req, res) => console.log(`Listening at port ${port}`));
