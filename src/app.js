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


// POST API (Create new document in collection "students")
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


// GET API (Fetch all students from database)
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


// Get API (Fetch specific student's data from database using "_id")
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
});


// Patch API (Update the student by its id)
app.patch("/students/:id", async (req, res) => {
    // res.send("Patch API to update student detail by its _id");

    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {new: true});

        res.status(200).send(updateStudent);
    } catch(e) {
        console.log("Error: ", e);

        res.status(404).send(updateStudent);
    }
})


// Delete API (Delete single Student using _id)
app.delete("/students/:id", async (req, res) => {
    // res.send("Delete API to delete single student from database...");

    try {
        const _id = req.params.id;
        console.log("Searched Student Id: "+_id);

        const deletedData = await Student.findByIdAndDelete({_id});
        console.log("->> "+deletedData);

        if(!deletedData) {
            return res.status(400).send();
        } else {
            res.status(200).send(deletedData);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});


app.listen(port, (err) => {
    if (!err) {
        console.log("Connection established successfully");
    } else {
        console.log("Error: ", err);
    }
});
