var formInputStudent = document.getElementById('form-student');
var formTableStudent = document.getElementById('form-table-student');
var tableStudentBody = document.getElementById("table-body-student");
var tableStudent = document.getElementById('table-student');
var phoneInput = document.getElementById('phone-input');
var studentName = document.getElementById('name-input');
var schoolInput = document.getElementById('school-input');

var NumberOfRecords = 0;
var selectedRowId = -1;
var rowColor = '#efcac4';

    var lastRow;


formTableStudent.addEventListener('submit', () => {

    if (selectedRowId == -1) {
        alert("Please select record to delete!");
        return;
    }
    let value = confirm("Do you want to delete record?");
    console.log(value);
    if (value) {
        let currentRow = document.getElementById(selectedRowId);
        currentRow.parentNode.removeChild(currentRow);
        calculateTotalRecords();
        selectedRowId = -1;
    }

})

formInputStudent.addEventListener('submit', () => {
    let tbody = tableStudent.getElementsByTagName('tbody')[0];
    // console.log(tbody);
    let phone = phoneInput.value;
    let name = studentName.value;
    let school = schoolInput.value;
    let gender = document.getElementById('select-gender').value;

    let arrStudent = [++NumberOfRecords, name, gender == 1 ? 'Female' : gender == 2 ? 'Male' : 'Other', school, phone];
    // Insert a row in the table at the last row
    var newRow = tbody.insertRow(tbody.rows.length);
    newRow.id = 'r' + NumberOfRecords;
    for (i = 0; i < 5; i++) {
        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(i);

        // Append a text node to the cell
        var newText = document.createTextNode(arrStudent[i]);
        newCell.appendChild(newText);
    }
    
    var createClickHandler = (row) => {
        return _ => {
            // if(selectedRowId != -1){
                // tableStudent.classList.remove('table-striped');
                // let rows = tableStudentBody.getElementsByTagName('tr');
                // rows.style.backgroundColor = rowColor;
                // tableStudent.className += ' table-striped';
            // }
            selectedRowId = row.id;
            console.log(lastRow);
            
            if(lastRow){
                lastRow.style.backgroundColor = '';
            }
            row.style.backgroundColor = rowColor;
            lastRow = row;
        };
    };
    newRow.onclick = createClickHandler(newRow);
    console.log(newRow);
    calculateTotalRecords();


})



function refreshTable(){
    tableStudent.removeClass(' table-striped');
}

function formatInput() {
    
    if (phoneInput != '')
        new Formatter(phoneInput, {
            'pattern': '(+855) {{19}}-{{999}}-{{9999}}',
            'persistent': false
        });

    if (studentName)
        new Formatter(studentName, {
            'pattern': '{{aaaaaaaaaaaaaaaaaaaaaaaa}}',
            'persistent': false
        });


    new Formatter(schoolInput, {
        'pattern': '{{nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn}}',
        'persistent': false
    })
}

function calculateTotalRecords() {
    var rows = tableStudentBody.getElementsByTagName("tr");
    let numsOfRow = 0;
    for (i = 0; i < rows.length; i++) {
        numsOfRow++;
    }
    document.getElementById('total-record').innerHTML = numsOfRow;
}

function initComponents() {
    formatInput();
}

window.onload = initComponents();