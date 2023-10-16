using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class CatalogoEntidadFederativa
    {
        public static ML.Result GetAll()
        {
            ML.Result resultado = new ML.Result();

            try
            {
                using (DL.DiegoMauricioLeenkenGroupEntities context = new DL.DiegoMauricioLeenkenGroupEntities())
                {
                    var query = (from tablaCatalogoEntidadFederativa in context.CatalogoEntidadFederativas
                                 select new
                                 {
                                     Id = tablaCatalogoEntidadFederativa.Id,
                                     Nombre = tablaCatalogoEntidadFederativa.Nombre

                                 });

                    resultado.Objects = new List<object>();

                    if (query != null && query.Count() > 0)
                    {
                        foreach (var datos in query)
                        {
                            ML.CatalogoEntidadFederativa catalogoEntidadFederativa = new ML.CatalogoEntidadFederativa();

                            catalogoEntidadFederativa.IdCatalogoEntidadFederativa = datos.Id;
                            catalogoEntidadFederativa.Estado = datos.Nombre;

                            resultado.Objects.Add(catalogoEntidadFederativa);
                        }
                        resultado.Correct = true;
                    }
                    else
                    {
                        resultado.Correct = false;
                        resultado.ErrorMessage = "No se encontraron datos de catalogo entidad federativa.";
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
