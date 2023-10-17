
$(document).ready(function () { //click
    GetAll();
    EntidadFederativaGetAll();
});

function GetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5653/api/empleado',
        success: function (result) { //200 OK 
            $('#tableEmpleado tbody').empty();
            $.each(result.Objects, function (i, empleado) {
                var filas =
                    '<tr>'
                    + "<td class='text-center'> <button onclick='GetById(" + empleado.IdEmpleado + ");'>  <i class='fa-solid fa-pen-to-square' style='color: blue;'></i> </button> </td>"
                    + "<td class='text-center'>" + empleado.IdEmpleado + "</td>"
                    + "<td class='text-center'>" + empleado.NumeroNomina + "</td>"
                    + "<td class='text-center'>" + empleado.Nombre + "</ td>"
                    + "<td class='text-center'>" + empleado.ApellidoPaterno + "</td>"
                    + "<td class='text-center'>" + empleado.ApellidoMaterno + "</td>"
                    + "<td class='text-center'>" + empleado.CatalogoEntidadFederativa.Estado + "</td>"
                    + "<td class='text-center'> <button onclick='Delete(" + empleado.IdEmpleado + ")'> <i class='fa-solid fa-trash' style='color: red;'></i> </button> </td>"

                    //+ '<td class="text-center">  <a href="#" onclick="return Eliminar(' + subCategoria.IdSubCategoria + ')">' + '<img  style="height: 25px; width: 25px;" src="../img/delete.png" />' + '</a>    </td>'
                    //+ '<a href="#" onclick="GetById(' + subCategoria.IdSubCategoria + ')"> <img  style="height: 25px; width: 25px;" src="../img/edit.ico" /> </a> '
                    //+ '<td class="text-center"> <button class="btn btn-danger" onclick="Eliminar(' + subCategoria.IdSubCategoria + ')"><span class="glyphicon glyphicon-trash" style="color:#FFFFFF"></span></button></td>'

                    + "</tr>";
                $("#tableEmpleado tbody").append(filas);
            });
        },
        error: function (result) {
            alert('Error en la consulta.');
        }
    });
};



function EntidadFederativaGetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5653/api/empleado/CatalogoEntidadFederativa',
        success: function (result) {
            $("#ddlCatalogoEntidadFederativa").append('<option value="' + 0 + '">' + 'Seleccione una opción' + '</option>');
            $.each(result.Objects, function (i, entidadFederativa) {
                $("#ddlCatalogoEntidadFederativa").append('<option value="'
                    + entidadFederativa.IdCatalogoEntidadFederativa + '">'
                    + entidadFederativa.Estado + '</option>');
            });
        }
    });
}

function Operacion() {
    var id = $('#txtId').val();

    if (id == 0 || id == "") {
        Add();
    } else {
        Update();
    }

}

function Add() {

    var empleado = {
        IdEmpleado: 0,
        NumeroNomina:$('#txtNumeroNomina').val(),
        Nombre: $('#txtNombre').val(),
        ApellidoPaterno: $('#txtApellidoPaterno').val(),
        ApellidoMaterno: $('#txtApellidoMaterno').val(),
        CatalogoEntidadFederativa: {
            IdCatalogoEntidadFederativa: $('#ddlCatalogoEntidadFederativa').val()
        }
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5653/api/empleado/', //ip de tu local
        dataType: 'json',
        data: empleado,
        success: function (result) {
            GetAll();
            $('#formulario').modal('hide');
            alert("Se registro el empleado con exito.");
        },
        error: function (result) {
            alert('Error al añadir empleado.');
        }
    });
};


function GetById(idEmpleado) {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:5653/api/empleado/' + idEmpleado,
        success: function (result) {
            $('#txtId').val(result.Object.IdEmpleado);
            $('#txtNumeroNomina').val(result.Object.NumeroNomina);
            $('#txtNombre').val(result.Object.Nombre);
            $('#txtApellidoPaterno').val(result.Object.ApellidoPaterno);
            $('#txtApellidoMaterno').val(result.Object.ApellidoPaterno);
            $('#ddlCatalogoEntidadFederativa').val(result.Object.CatalogoEntidadFederativa.IdCatalogoEntidadFederativa);
            $('#formulario').modal('show');
        },
        error: function (result) {
            alert('Error en la consulta.');
        }


    });

}


function Update() {

    var empleado = {
        IdEmpleado: $('#txtId').val(),
        NumeroNomina: $('#txtNumeroNomina').val(),
        Nombre: $('#txtNombre').val(),
        ApellidoPaterno: $('#txtApellidoPaterno').val(),
        ApellidoMaterno: $('#txtApellidoMaterno').val(),
        CatalogoEntidadFederativa: {
            IdCatalogoEntidadFederativa: $('#ddlCatalogoEntidadFederativa').val()
        }
    }

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:5653/api/empleado/'+empleado.IdEmpleado,
        datatype: 'json',
        data: empleado,
        success: function (result) {
            GetAll();
            $('#formulario').modal('hide');
            alert("Se actualizo con exito al empleado.");

        },
        error: function (result) {
            alert('Error en la actualizacion.');
        }
    });

};



function Delete(IdEmpleado) {

    if (confirm("¿Estas seguro de eliminar al Empleado seleccionado?")) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:5653/api/empleado/' + IdEmpleado,
            success: function (result) {
                GetAll();
                alert("Se eliminio al empleado con exito.");
            },
            error: function (result) {
                alert('Error en al eliminar.');
            }
        });

    };
};


function ShowModal() {
    $('#formulario').modal('show');
}
function HiddenModal() {
    $('#formulario').modal('hide');
}