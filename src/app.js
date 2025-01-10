const express = require("express");
require("./db/conn.js");
const Student = require("./models/students.js");

const app = express();
const port = process.env.PORT || 4000;
// const port = 8000;

app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("<center><h1>Welcome to Server's Home Page</h1></center>");
// })


// POST API
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


// GET API (Get all students from database)
app.get("/students", async (req, res) => {
    // res.send("Get all students data");

    try {
        const studentsData = await Student.find();

        res.status(200).send(studentsData);
    } catch(err) {
        console.log("Error: ", err);

        res.send(e);
    }
})


// Get API (Get specific student's data from database using "_id")
app.get("/students/:id", async (req, res) => {
    // res.send("Get API to get specific student data..");

    try {
        const _id = req.params.id;
        console.log("Searched Student Id: "+_id);

        const studentData = await Student.findById({_id});

        if(!studentData) {
            return res.status(404).send();
        } else {
            res.status(200).send(studentData);
        }
    } catch(err) {
        console.log("Error: ",err);

        res.status(500).send(err);
    }
})


app.listen(port, (err) => {
    if (!err) {
        console.log("Connection established successfully");
    } else {
        console.log("Error: ", err);
    }
});
