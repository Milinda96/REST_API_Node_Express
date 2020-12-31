const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const students = [
    {
      name: 'Milinda',
      id: 1,
    },
    {
      name: 'Nimal',
      id: 2,
    },
    {
      name: 'Sarath',
      id: 3,
    },
  ];

app.get('/', (req, res) => {
    res.send('Welcome to my api testing');
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        res.status(404).send('<h2 style="color: red;">Ooops...something went wrong!</h2>');
    } else {
        res.send(student);
    }
});

app.post('/api/students', (req, res) => {

    const student = {
        id: students.length + 1,
        name: req.body.name
    };
    students.push(student);
    res.send(student);
});

app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        res.status(400).send('Student Cannot find');
    } else {
        student.name = req.body.name;
        res.send(student);
    }
});

app.delete('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));

    if (!student) {
        res.status(404).send('User cannot find');
    } else {
        const index = students.indexOf(student);
        students.splice(index, 1);
        res.send(student);
    }
});
const port = process.env.PORT || 8000;
app.listen(port, () => console.log('Listening to the server'));