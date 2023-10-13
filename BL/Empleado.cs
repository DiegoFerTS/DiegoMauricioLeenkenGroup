namespace BL
{
    public class Empleado
    {
        // Metodo add
        public static ML.Result Add(ML.Empleado empleado)
        {
            ML.Result resultado = new ML.Result();

            // conteido del codigo
            try
            {
                using (DL.DiegoMauricioLeenkenGroupEntities context =new DL.DiegoMauricioLeenkenGroupEntities())
                {
                    DL.Empleado nuevoEmpleado = new DL.Empleado();
                    nuevoEmpleado.NumeroNomina = empleado.NumeroNomina;
                    nuevoEmpleado.Nombre=empleado.Nombre;
                    nuevoEmpleado.ApellidoPaterno=empleado.ApellidoPaterno;
                    nuevoEmpleado.ApellidoMaterno = empleado.ApellidoMaterno;
                    nuevoEmpleado.IdEstado = empleado.IdEmpleado;

                    context.Empleadoes.Add(nuevoEmpleado);
                    context.SaveChanges();

                }
                resultado.Correct = true;

            }
            catch (Exception ex)
            {
                resultado.Correct = false;
                resultado.ErrorMessage = ex.Message;
                resultado.Ex=ex;
            }

            return resultado;
        }


        // Metodo update
        public static ML.Result Update(ML.Empleado empleado)
        {
            ML.Result resultado = new ML.Result();

            try
            {
                using (DL.DiegoMauricioLeenkenGroupEntities context=new DL.DiegoMauricioLeenkenGroupEntities())
                {
                    var query = (from tablaempleado in context.Empleadoes
                                 where tablaempleado.Id == empleado.IdEmpleado
                                 select tablaempleado).SingleOrDefault();
                    if (query!=null)
                    {
                        query.NumeroNomina = empleado.NumeroNomina;
                        query.Nombre = empleado.Nombre;
                        query.ApellidoPaterno = empleado.ApellidoPaterno;
                        query.ApellidoMaterno = empleado.ApellidoMaterno;
                        query.IdEstado = empleado.CatalogoEntidadFederativa.IdCatalogoEntidadFederativa;

                        context.SaveChanges();
                        resultado.Correct=true;

                    }

                }
            }
            catch (Exception ex)
            {

                resultado.Correct = false;
                resultado.ErrorMessage=ex.Message;
                resultado.Ex = ex;
            }

            return resultado;
        }


        // Metodo delete
        public static ML.Result Delete(ML.Empleado empleado)
        {
            ML.Result resultado = new ML.Result();

            try
            {
                using (DL.DiegoMauricioLeenkenGroupEntities context =new DL.DiegoMauricioLeenkenGroupEntities())
                {
                    var query = (from tablaempleado in context.Empleadoes
                                 where tablaempleado.Id == empleado.IdEmpleado
                                 select tablaempleado).First();
                    context.Empleadoes.Remove(query);
                    context.SaveChanges();
                    resultado.Correct = true;

                }

            }
            catch (Exception ex)
            {

                resultado.Correct = false;
                resultado.ErrorMessage = ex.Message;
                resultado.Ex=ex;
            }

            return resultado;
        }


        // Metodo GetAll
        public static ML.Result GetAll()
        {
            ML.Result resultado = new ML.Result();

            // conteido del codigo

            return resultado;
        }

        // Metodo GetById
        public static ML.Result GetById()
        {
            ML.Result resultado = new ML.Result();

            // conteido del codigo

            return resultado;
        }
    }
}