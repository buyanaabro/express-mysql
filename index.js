const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
const db = require("./db")
db.connect
app.use(express.json())

app.get("/students", (req, res) => {
  db.query("select * from students order by point desc", (err, results) => {
    if(err)
      console.log(err)
    res.send(results)
  })
})

app.get("/booktypes", (req, res) => {
  db.query("select * from booktypes", (err, results) => {
    if(err)
      console.log(err)
    res.send(results)
  })
})

app.get("/students1", (req, res) => {
  db.query("select borrowID, students.studentName, students.gender, books.bookName, books.point from borrows inner join students on borrows.studentID = students.studentID inner join books on borrows.bookID = books.bookID order by point asc", (err, results) => {
    if(err)
      console.log(err)
    res.send(results)
  })
})

app.get("/students2", (req, res) => {
  db.query("select * from students where gender = 'emegtei' order by point desc", (err, results) => {
    if(err)
      console.log(err)
    res.send(results)
  })
})

app.post("/studentbookytype", (req, res) => {
  const { studentName, surName, birthDate, gender, className, point, typesName } = req.body;
  db.query(`insert into students (studentName, surName, birthDate, gender, className, point) values (?, ?, ?, ?, ?, ?)`, [studentName, surName, birthDate, gender, className, point], (err, results) => {
      if (err)
        console.error(err);
      db.query(`insert into booktypes (typesName) values (?)`, [typesName], (err, results) => {
        if (err)
          console.error(err);
        results.send("student, booktype added");
      });
    }
  );
});


app.patch("/student/:studentID", (req, res) => {
  const { studentName, surName, birthDate, gender, className, point } = req.body;
  db.query(`UPDATE students SET studentName = ?, surName = ?, birthDate = ?, gender = ?, className = ?, point = ? WHERE studentID = ?`, [studentName, surName, birthDate, gender, className, point, req.params.studentID], (err, results) => {
    if(err)
      console.log(err)
    res.send("student info updated")
  });
});

app.delete("/student/:studentID", (req, res) => {
  db.query(`delete from students where studentID = ?`, [req.params.studentID], (err, results) => {
    if (err)
      console.error(err);
    res.send("student deleted");
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
