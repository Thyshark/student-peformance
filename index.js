
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const jsonParser = bodyParser.json();
const fileName = 'students.json';

// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', (request, response) => {
    response.render('home');
});

// This is a RESTful GET web service
app.get('/students', (request, response) => {
    data.sort((a, b) => (a.name > b.name) ? 1 : -1 );
    response.send(data);
});

// This is a RESTful POST web service
app.post('/students', jsonParser, (request, response) => {
    data.push(request.body);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    response.end();
});

// This is a RESTful PUT web service
app.put('/students/:id', jsonParser, (request, response) => {
    const id = request.params.id;
    const student = request.body;
    const index = data.findIndex(s => s.id === id);
    if (index !== -1) {
        data[index] = student;
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    }
    response.end();
});

// This is a RESTful DELETE web service
app.delete('/students/:id', (request, response) => {
    const id = request.params.id;
    const index = data.findIndex(s => s.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    }
    response.end();
});

app.listen(port);
console.log('server listening on port 3000');


// Add student to the table and send data to the server
function addStudent() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const marks = document.getElementById('marks').value;
    const student = { fname, lname, marks };
    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    .then(response => {
        location.reload(); // refresh the page
    })
    .catch(error => console.error(error));
}

// Update student data in the table and send data to the server
function updateStudent(id) {
    const firstName = document.getElementById('fname').value;
  const lastName = document.getElementById('lname').value;
  const marks = document.getElementById('marks').value;
  
  // Find the student with the given id in the data array
  const studentIndex = data.findIndex(student => student.id === id);
  if (studentIndex === -1) {
    console.error(`Student with id ${id} not found`);
    return;
  }
  
  // Update the student data
  data[studentIndex].firstName = firstName;
  data[studentIndex].lastName = lastName;
  data[studentIndex].marks = marks;
  
  // Save the updated data to the JSON file
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  
  // Update the table row with the new data
  const tableRow = document.getElementById(`row-${id}`);
  tableRow.cells[0].innerText = firstName;
  tableRow.cells[1].innerText = lastName;
  tableRow.cells[2].innerText = marks;
   
}
///////////////////////////////////////////
// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const app = express();
// const port = 3000;
// const jsonParser = bodyParser.json();
// const fileName = __dirname + '/students.js';

// // Load data from file
// let students = [];
// try {
//   students = require(fileName);
// } catch (err) {
//   console.error(err);
// }

// app.set('views', 'views');
// app.set('view engine', 'hbs');
// app.use(express.static(__dirname +'/public'));

// // Route to render home page
// app.get('/', (req, res) => {
//   res.render('index');
// });

// // This is a RESTful GET web service
// app.get('/students', (req, res) => {
//   students.sort((a, b) => (a.fname > b.fname) ? 1 : -1 );
//   res.send(students);
// });

// // This is a RESTful POST web service
// app.post('/students', jsonParser, (req, res) => {
//   const student = req.body;
//   students.push(student);
//   fs.writeFileSync(fileName, 'module.exports = ' + JSON.stringify(students, null, 2));
//   res.end();
// });

// // This is a RESTful PUT web service
// app.put('/students/:id', jsonParser, (req, res) => {
//   const id = req.params.id;
//   const student = req.body;
//   const index = students.findIndex(s => s.id === id);
//   if (index !== -1) {
//     students[index] = student;
//     fs.writeFileSync(fileName, 'module.exports = ' + JSON.stringify(students, null, 2));
//   }
//   res.end();
// });

// // This is a RESTful DELETE web service
// app.delete('/students/:id', (req, res) => {
//   const id = req.params.id;
//   const index = students.findIndex(s => s.id === id);
//   if (index !== -1) {
//     students.splice(index, 1);
//     fs.writeFileSync(fileName, 'module.exports = ' + JSON.stringify(students, null, 2));
//   }
//   res.end();
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// // Add student to the table and send data to the server
// function addStudent() {
//   const fname = document.getElementById('fname').value;
//   const lname = document.getElementById('lname').value;
//   const marks = document.getElementById('marks').value;
//   const student = { fname, lname, marks };
//   fetch('/students', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(student)
//   })
//   .then(response => {
//     location.reload(); // refresh the page
//   })
//   .catch(error => console.error(error));
// }

// // Update student data in the table and send data to the server
// function updateStudent(id) {
//   const fname = document.getElementById('fname-' + id).value;
//   const lname = document.getElementById('lname-' + id).value;
//   const marks = document.getElementById('marks-' + id).value;
//   const student = { id, fname, lname, marks };
//   fetch('/students/' + id, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(student)
//   })
//   .then(response => {
//     location.reload(); // refresh the page
//   })
//   .catch(error => console.error(error));
// }



     
              



