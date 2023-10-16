// <reference path="SubCategoriaCRUD.js" />

$(document).ready(function () { //click
    GetAll();
    CategoriaGetAll();
});

function GetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5653/api/empleado',
        success: function (result) { //200 OK 
            $('#TablaEmpleado tbody').empty();
            $.each(result.Objects, function (i, subCategoria) {
                var filas =
                    '<tr>'
                    + '<td class="text-center"> '
                   
                    + '</td>'
                    + "<td  id='id' class='text-center'>" + subCategoria.IdSubCategoria + "</td>"
                    + "<td class='text-center'>" + subCategoria.Nombre + "</td>"
                    + "<td class='text-center'>" + subCategoria.Descripcion + "</ td>"
                    + "<td class='text-center'>" + subCategoria.Categoria.IdCategoria + "</td>"
                    //+ '<td class="text-center">  <a href="#" onclick="return Eliminar(' + subCategoria.IdSubCategoria + ')">' + '<img  style="height: 25px; width: 25px;" src="../img/delete.png" />' + '</a>    </td>'
                    + '<a href="#" onclick="GetById(' + subCategoria.IdSubCategoria + ')"> <img  style="height: 25px; width: 25px;" src="../img/edit.ico" /> </a> '
                    + '<td class="text-center"> <button class="btn btn-danger" onclick="Eliminar(' + subCategoria.IdSubCategoria + ')"><span class="glyphicon glyphicon-trash" style="color:#FFFFFF"></span></button></td>'

                    + "</tr>";
                $("#SubCategorias tbody").append(filas);
            });
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });
};



function CategoriaGetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:14982/api/Categoria/GetAll',
        success: function (result) {
            $("#ddlCategorias").append('<option value="' + 0 + '">' + 'Seleccione una opción' + '</option>');
            $.each(result.Objects, function (i, categoria) {
                $("#ddlCategorias").append('<option value="'
                    + categoria.IdCategoria + '">'
                    + categoria.Descripcion + '</option>');
            });
        }
    });
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
            $('#myModal').modal();
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });
};


function GetById(IdSubCategoria) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:14982/api/Empleado/GetById/' + IdSubCategoria,
        success: function (result) {
            $('#txtIdSubCategoria').val(result.Object.IdSubCategoria);
            $('#txtNombre').val(result.Object.Nombre);
            $('#txtDescripcion').val(result.Object.Descripcion);
            $('#txtIdCategoria').val(result.Object.Categoria.IdCategoria);
            $('#ModalUpdate').modal('show');
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }


    });

}


function Update() {

    var empleado = {
        IdEmpleado: 0,
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
            $('#myModal').modal();
            $('#Modal').modal('show');
            GetAll();
            Console(respond);
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });

};



function Eliminar(IdEmpleado) {

    if (confirm("¿Estas seguro de eliminar al Empleado seleccionado?")) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:5653/api/empleado/' + IdEmpleado,
            success: function (result) {
                $('#myModal').modal();
                GetAll();
            },
            error: function (result) {
                alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
            }
        });

    };
};
function Modelo() {

}