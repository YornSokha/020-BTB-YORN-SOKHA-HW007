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

formTableStudent.addEventListener('submit', (e) => {
    e.preventDefault();
    if (selectedRowId == -1) {
        let timerInterval
        Swal.fire({
            title: 'Please select to row to delete!',
            // html: 'I will close in <strong></strong> seconds.',
            timer: 1500,
            onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                    Swal.getContent().querySelector('strong')
                        .textContent = Swal.getTimerLeft()
                }, 100)
            },
            onClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.timer
            ) {
                console.log('I was closed by the timer')
            }
        })
        return;
    }

    // let value = confirm("Do you want to delete record?");

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            // Delete row
            let currentRow = document.getElementById(selectedRowId);
            currentRow.parentNode.removeChild(currentRow);
            calculateTotalRecords();
            selectedRowId = -1;

            Swal.fire(
                'Deleted!',
                'Record has been deleted.',
                'success'
            )

        }
    })
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
            selectedRowId = row.id;
            console.log(lastRow);

            if (lastRow) {
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

function formatInput() {


    new Formatter(phoneInput, {
        'pattern': '(+855) {{19}}-{{999}}-{{9999}}',
        'persistent': false
    });


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