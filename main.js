var rIndex,
table = document.getElementById("table"); 

// check the empty input
function checkEmptyInput()
{
var isEmpty = false,
    fname = document.getElementById("fname").value,
    lname = document.getElementById("lname").value,
    marks = document.getElementById("marks").value;

if(fname === ""){
    alert("First Name Connot Be Empty");
    isEmpty = true;
}
else if(lname === ""){
    alert("Last Name Connot Be Empty");
    isEmpty = true;
}
else if(marks === ""){
    alert("marks Connot Be Empty");
    isEmpty = true;
}
return isEmpty;
}

// add Row
function addHtmlTableRow()
{
// get the table by id
// create a new row and cells
// get value from input text
// set the values into row cell's
if(!checkEmptyInput()){
var newRow = table.insertRow(table.length),
    cell1 = newRow.insertCell(0),
    cell2 = newRow.insertCell(1),
    cell3 = newRow.insertCell(2),
    fname = document.getElementById("fname").value,
    lname = document.getElementById("lname").value,
    marks = document.getElementById("marks").value;

cell1.innerHTML = fname;
cell2.innerHTML = lname;
cell3.innerHTML = marks;
// call the function to set the event to the new row
selectedRowToInput();
}
}

// display selected row data into input text
function selectedRowToInput()
{

for(var i = 1; i < table.rows.length; i++)
{
    table.rows[i].onclick = function()
    {
      // get the seected row index
      rIndex = this.rowIndex;
      document.getElementById("fname").value = this.cells[0].innerHTML;
      document.getElementById("lname").value = this.cells[1].innerHTML;
      document.getElementById("marks").value = this.cells[2].innerHTML;
    };
}
}
selectedRowToInput();

function editHtmlTbleSelectedRow()
{
var fname = document.getElementById("fname").value,
    lname = document.getElementById("lname").value,
    marks = document.getElementById("marks").value;
if(!checkEmptyInput()){
table.rows[rIndex].cells[0].innerHTML = fname;
table.rows[rIndex].cells[1].innerHTML = lname;
table.rows[rIndex].cells[2].innerHTML = marks;
}
}


function removeSelectedRow()
{
table.deleteRow(rIndex);
// clear input text
document.getElementById("fname").value = "";
document.getElementById("lname").value = "";
document.getElementById("marks").value = "";
}

// //////////////////////////////////////////////////////
function calculateMedian() {
var table = document.getElementById("table");
var marks = [];

// Get marks from table
for (var i = 1; i < table.rows.length; i++) {
marks.push(parseInt(table.rows[i].cells[2].innerHTML));
}

// Add marks from user input
var inputMarks = document.getElementById("marks").value;
if (inputMarks !== "") {
var inputMarksArray = inputMarks.split(",");
for (var j = 0; j < inputMarksArray.length; j++) {
  marks.push(parseInt(inputMarksArray[j]));
}
}

marks.sort(function(a, b) { return a - b; });
var median;
if (marks.length % 2 === 0) {
median = (marks[marks.length / 2 - 1] + marks[marks.length / 2]) / 2;
} else {
median = marks[Math.floor(marks.length / 2)];
}

// Add row for median
var newRow = table.insertRow(table.rows.length);

var nameCell = newRow.insertCell(0);
var nameCell=innerHTML = "";

var nameCell = newRow.insertCell(1);
nameCell.innerHTML = "Median";
var marksCell = newRow.insertCell(2);
marksCell.innerHTML = median;
newRow.classList.add("median");

table.style.display = "table";
}

calculateMedian();







///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
var table = document.getElementById("table"); // get the table element
const data = {
labels: [], // array to store labels (x-axis)
datasets: [
{
label: 'marks', // label for the dataset
data: [], // array to store data (y-axis)
backgroundColor: 'rgba(255, 99, 132, 0.2)', // color for the dataset
borderColor: 'rgba(255, 99, 132, 1)', // border color for the dataset
borderWidth: 1 // border width for the dataset
}
]
};

// loop through the table rows and add data to the chart
for (let i = 1; i < table.rows.length; i++) {
const row = table.rows[i];
const id = "row-" + i; // add a unique ID to each row
row.id = id; // set the row ID
const lname = row.cells[1].textContent; // get the lname from the second cell
const marks = row.cells[2].textContent; // get the marks from the third cell
data.labels.push(lname); // add the lname to the labels array
data.datasets[0].data.push(marks); // add the marks to the data array
}

function addData() {
const id = "row-" + (table.rows.length - 1); // get the ID of the last row
const row = document.getElementById(id); // get the row element
const lname = row.cells[1].textContent; // get the lname from the second cell
const marks = row.cells[2].textContent; // get the marks from the third cell

// add the data to the chart
data.labels.push(lname);
data.datasets[0].data.push(marks);
myChart.update();
}

// create the chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
type: 'bar', // chart type
data: data, // data for the chart
options: {
scales: {
y: {
beginAtZero: true // start y-axis at zero
}
}
}
});
