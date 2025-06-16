const express = require('express');
const mongoose = require('mongoose');
const app = express();
const students = [];
const port = 3000;

app.use(express.json());

class Student {
  constructor(name, grade, bio) { 
    this.name = name;
    this.grade = grade;
    this.bio = bio;
  }

  
  getBio() {
    return `Name: ${this.name}, Grade: ${this.grade}, Bio: ${this.bio}`;
  }
}


const student = new Student("Alice", 85, "Alice is a diligent student who excels in mathematics.");
console.log(student.getBio()); 
console .log()


app.post('/students', (req, res) => {
  const { name, grade, bio } = req.body;
  const newStudent = new Student(name, grade, bio);
  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.get('/students', (req, res) => {
  res.json(students);
});


app.get('/students/:name', (req, res) => {
  const student = students.find(s => s.name === req.params.name);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});
//connect to MongoDB    
 mongoose.connect('mongodb://localhost:27017/class')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
