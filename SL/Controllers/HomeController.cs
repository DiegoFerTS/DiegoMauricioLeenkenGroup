using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SL.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            // Mensaje de prueba
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
