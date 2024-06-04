$(document).ready(function () {
    ShowEmployeeData();
});

function ShowEmployeeData() {
    $.ajax({
        url: '/Employee/EmployeeList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.employeeId + '</td>';
                object += '<td>' + item.employeeName + '</td>';
                object += '<td>' + item.city + '</td>';
                object += '<td>' + item.state + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.employeeId+');">Edit</a> | <a href="#" class="btn btn-danger" onclick="Delete(' + item.employeeId + ');">Delete</a> </td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }
    });

}

$('#btnAddEmployees').click(function () {
    ClearTextBox();
    $('#EmployeeModalid').modal('show');
    $('#EmployeeId').hide();
    $('#AddEmployeeDetails').css('display', 'block');
    $('#btnUpdate').hide();

});

function AddEmployees() {
    var objdata = {
        EmployeeName: $('#Name').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Salary: $('#Salary').val(),
    };
    $.ajax({
        url: '/Employee/AddEmployee',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert("Data Saved");
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved");
        }
    });
    
}


function HideModalPopUp() {
    $('#EmployeeModalid').modal('hide');
}

function ClearTextBox() {
    $('#Name').val('');
    $('#City').val('');
    $('#State').val('');
    $('#Salary').val('');
}

function Delete(id) {
    if (confirm('Are you sure, you want to delete this record?')) {
        $.ajax({
            url: 'Employee/Delete?id=' + id,
            success: function () {
                alert("Recorded deleted");
                ShowEmployeeData();
            },
            error: function () {
                alert("Data can't be deleted");
            }
        });
    }
}
function Edit(id) {debugger
    $.ajax({
        url: '/Employee/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8;',
        dataType: 'json',
        success: function (response) {
            $('#EmployeeModalid').modal('show');
            $('#empId').val(response.employeeId);
            $('#Name').val(response.employeeName);
            $('#City').val(response.city);
            $('#State').val(response.state);
            $('#Salary').val(response.salary);
            $('#AddEmployeeDetails').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
        },
        error: function () {
            alert('Data not found');
        }
    })
}
function UpdateEmployee() {
    var objdata = {
        employeeId: $('#empId').val(),
        EmployeeName: $('#Name').val(),
        City: $('#City').val(),
        State: $('#State').val(),
        Salary: $('#Salary').val(),
    };
    $.ajax({
        url: '/Employee/Update',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Updated');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved");
        }
    })
}