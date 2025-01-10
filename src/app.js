const express = require("express");
require("./db/conn.js");
const Student = require("./models/students.js");

const app = express();
const port = process.env.PORT || 4000;
// const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<center><h1>Welcome to Server's Home Page</h1></center>");
})

app.post("/students", (req, res) => {
    console.log(req.body);
    const user = new Student(req.body);

    user.save()    // saved(inserted) in mongodb database
    .then(() => {
        console.log("Data successfully created!");

        res.status(201).send(user);     // created data sent to the client with error status "201"
    })
    .catch((e) => {
        console.log("Error: ", e);

        res.status(400).send(e);        // error send to client with error status "400"
    }) 

    // res.send("Hello from the server by Shahbaz Talhab Patel.");
});

app.listen(port, (err) => {
    if (!err) {
        console.log("Connection established successfully");
    } else {
        console.log("Error: ", err);
    }
});
