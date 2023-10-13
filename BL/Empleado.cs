namespace BL
{
    public class Empleado
    {
        // Metodo add
        public static ML.Result Add()
        {
            ML.Result resultado = new ML.Result();

            // conteido del codigo

            return resultado;
        }


        // Metodo update
        public static ML.Result Update()
        {
            ML.Result resultado = new ML.Result();

            // conteido del codigo

            return resultado;
        }


        // Metodo delete
        public static ML.Result Delete()
        {
            ML.Result resultado = new ML.Result();

            // conteido del codigo

            return resultado;
        }


        // Metodo GetAll
        public static ML.Result GetAll()
        {
            ML.Result resultado = new ML.Result();

            try
            {
                using (DL.DiegoMauricioLeenkenGroupEntities context = new DL.DiegoMauricioLeenkenGroupEntities())
                {
                    var query = (from tablaEmpleado in context.Empleadoes
                                 join tablaCatalogoEntidadFederativa in context.CatalogoEntidadFederativas
                                 on tablaEmpleado.IdEstado equals tablaCatalogoEntidadFederativa.Id
                                 select new
                                 {
                                     IdEmpleado = tablaEmpleado.Id,
                                     NumeroNomina = tablaEmpleado.NumeroNomina,
                                     NombreEmpleado = tablaEmpleado.Nombre,
                                     ApellidoPaterno = tablaEmpleado.ApellidoPaterno,
                                     ApellidoMaterno = tablaEmpleado.ApellidoMaterno,
                                     IdEstado = tablaCatalogoEntidadFederativa.Id,
                                     NombreEstado = tablaCatalogoEntidadFederativa.Nombre

                                 });

                    resultado.Objects = new List<object>();

                    if (query != null && query.Count() > 0)
                    {
                        foreach (var datos in query)
                        {
                            ML.Empleado empleado = new ML.Empleado();
                            empleado.CatalogoEntidadFederativa = new ML.CatalogoEntidadFederativa();

                            empleado.IdEmpleado = datos.IdEmpleado;
                            empleado.NumeroNomina = datos.NumeroNomina;
                            empleado.Nombre = datos.NombreEmpleado;
                            empleado.ApellidoPaterno = datos.ApellidoPaterno;
                            empleado.ApellidoMaterno = datos.ApellidoMaterno;
                            empleado.CatalogoEntidadFederativa.IdCatalogoEntidadFederativa = datos.IdEstado;
                            empleado.CatalogoEntidadFederativa.Estado = datos.NombreEstado;

                            resultado.Objects.Add(empleado);
                        }
                        resultado.Correct = true;
                    }
                    else
                    {
                        resultado.Correct = false;
                        resultado.ErrorMessage = "No se encontraron datos de empleados.";
                    }
                }
            }
            catch (Exception ex)
            {
                resultado.Correct = false;
                resultado.ErrorMessage = ex.Message;
                resultado.Ex = ex;
            }

            return resultado;
        }

        // Metodo GetById
        public static ML.Result GetById(int idEmpleado)
        {
            ML.Result resultado = new ML.Result();

            try
            {
                using (DL.DiegoMauricioLeenkenGroupEntities context = new DL.DiegoMauricioLeenkenGroupEntities())
                {
                    var query = (from tablaEmpleado in context.Empleadoes
                                 join tablaCatalogoEntidadFederativa in context.CatalogoEntidadFederativas
                                 on tablaEmpleado.IdEstado equals tablaCatalogoEntidadFederativa.Id
                                 where tablaEmpleado.Id == idEmpleado
                                 select new
                                 {
                                     IdEmpleado = tablaEmpleado.Id,
                                     NumeroNomina = tablaEmpleado.NumeroNomina,
                                     NombreEmpleado = tablaEmpleado.Nombre,
                                     ApellidoPaterno = tablaEmpleado.ApellidoPaterno,
                                     ApellidoMaterno = tablaEmpleado.ApellidoMaterno,
                                     IdEstado = tablaCatalogoEntidadFederativa.Id,
                                     NombreEstado = tablaCatalogoEntidadFederativa.Nombre

                                 });


                    if (query != null && query.Count() > 0)
                    {

                        ML.Empleado empleado = new ML.Empleado();
                        empleado.CatalogoEntidadFederativa = new ML.CatalogoEntidadFederativa();

                        var queryDatos = query.ToList().Single();

                        empleado.IdEmpleado = queryDatos.IdEmpleado;
                        empleado.NumeroNomina = queryDatos.NumeroNomina;
                        empleado.Nombre = queryDatos.NombreEmpleado;
                        empleado.ApellidoPaterno = queryDatos.ApellidoPaterno;
                        empleado.ApellidoMaterno = queryDatos.ApellidoMaterno;
                        empleado.CatalogoEntidadFederativa.IdCatalogoEntidadFederativa = queryDatos.IdEstado;
                        empleado.CatalogoEntidadFederativa.Estado = queryDatos.NombreEstado;

                        resultado.Object = empleado;

                        resultado.Correct = true;
                    }
                    else
                    {
                        resultado.Correct = false;
                        resultado.ErrorMessage = "No se encontraron datos de empleados.";
                    }
                }
            }
            catch (Exception ex)
            {
                resultado.Correct = false;
                resultado.ErrorMessage = ex.Message;
                resultado.Ex = ex;
            }

            return resultado;
        }
    }
}