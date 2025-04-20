
function addRow(name, phone) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = phone;
    const actionsCell = newRow.insertCell(2);
    actionsCell.innerHTML = '<button class="btn btn-warning btn-sm" onclick="editRow(this)">Редактировать</button> <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Удалить</button>';
}

function editRow(button) {
    editingRow = button.parentElement.parentElement;
    document.getElementById('name').value = editingRow.cells[0].innerText;
    document.getElementById('phone').value = editingRow.cells[1].innerText;
    document.getElementById('formTitle').innerText = 'Редактировать запись';
    showForm();
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
}

function showForm() {
    document.getElementById('formContainer').style.display = 'block';
}

function hideForm() {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('dataForm').reset();
    document.getElementById('formTitle').innerText = 'Добавить запись';
}

function sortTable(columnIndex) {
    const table = document.getElementById('dataTable');
    const rows = Array.from(table.rows).slice(1);
    const isAscending = table.rows[0].cells[columnIndex].classList.toggle('asc');

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText.toLowerCase();
        const cellB = rowB.cells[columnIndex].innerText.toLowerCase();

        if (cellA < cellB) return isAscending ? -1 : 1;
        if (cellA > cellB) return isAscending ? 1 : -1;
        return 0;
    });

    rows.forEach(row => {
        table.appendChild(row);
    });
}
