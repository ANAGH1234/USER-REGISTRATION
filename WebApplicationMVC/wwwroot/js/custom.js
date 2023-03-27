$(document).ready(function () {
    ShowUserRegistrationData();
})

function ShowUserRegistrationData() {
    
    $.ajax({
        url: '/Registration/GetAllRegistration',
        type: 'Get',
        datatype: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            console.log(result);
            var object = '';
            $.each(result, function (index, UserRegistrations) {
                object += '<tr>';
                object += '<td>' + UserRegistrations.id + '</td>';
                object += '<td>' + UserRegistrations.name + '</td>';
                object += '<td>' + UserRegistrations.email + '</td>';
                object += '<td>' + UserRegistrations.phone + '</td>';
                object += '<td>' + UserRegistrations.address + '</td>';
                object += '<td>' + UserRegistrations.state + '</td>';
                object += '<td>' + UserRegistrations.city + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + UserRegistrations.id + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + UserRegistrations.id + ')">Delete</a></td>';

                object += '</tr>';

            });
            $('#table_Data').html(object);
        },

        error: function () {
            alert("data cant get");
        }
    });
};

$('#btnRegistartion').click(function () {
    ClearTextBox();
    $('#UserRegistrationMadal').modal('show');
    $('#RegistrationId').hide();
    $('#AddUserRegistration').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#UserRegistrationHeading').text('Add Data');
});


function AddUserRegistration() {
    var objData = {
        Name: $('#Name').val(),
        Email: $('#Email').val(),
        Phone: $('#Phone').val(),
        Address: $('#Address').val(),
        State: $('#State').val(),
        City: $('#City').val(),
    }


    $.ajax({
        url: '/Registration/AddUserRegistration',
        type: 'POST',
        data: objData,
        datatype: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',

        success: function () {
            alert('Data Saved')
            ClearTextBox();
            ShowUserRegistrationData();
            HideModalPopup();
        },
        error: function () {
            alert("Data can't be Saved!")
        }
    });
};


function HideModalPopup() {
    $('#UserRegistrationMadal').modal('hide');
}



function ClearTextBox() {
    objData = {
        Name: $('#Name').val(''),
        Email: $('#Email').val(''),
        Phone: $('#Phone').val(''),
        Address: $('#Address').val(''),
        State: $('#State').val(''),
        City: $('#City').val(''),
        Id: $('#UserRegistrationId').val(''),

    }
}


function Delete(id) {
    $.ajax({
        url: '/Registration/Delete?id=' + id,
        success: function () {
            alert('Record Deleted!')
        },
        error: function () {
            alert("Data cant de deleted!");
        }
    })
}

function Edit(id) {
    $.ajax({
        url: '/Registration/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8;',
        datatype: 'json',
        success: function (response) {
            $('#UserRegistrationMadal').modal('show');
            $('#UserRegistrationId').val(response.id);
            $('#Name').val(response.name);
            $('#Email').val(response.email);
            $('#Phone').val(response.phone);
            $('#Address').val(response.address);
            $('#State').val(response.state);
            $('#City').val(response.city);
            $('#AddUserRegistration').css('display', 'none');
            $('#btnUpdate').css('display', 'block');
            $('#UserRegistrationHeading').text('Update Record');

        },
        error: function () {
            alert("Data Not found");
        }
    })
}

function UpdateUserRegistration() {

    var objData = {
        Id: $('#UserRegistrationId').val(),
        Name: $('#Name').val(),
        Email: $('#email').val(),
        Phone: $('#phone').val(),
        Address: $('#address').val(),
        State: $('#state').val(),
        City: $('#city').val(),

    }

    $.ajax({
        url: '/Registration/Update',
        type: 'POST',
        data: objData,
        datatype: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        success: function () {
            alert('Data Saved')
            ClearTextBox();
            ShowUserRegistrationData();
            HideModalPopup();
        },
        error: function () {
            alert("Data can't be Saved!")
        }
    });

}