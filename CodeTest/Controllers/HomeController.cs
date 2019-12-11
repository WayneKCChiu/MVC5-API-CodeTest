using System.Web.Mvc;

namespace CodeTest.Controllers
{
   public class HomeController: Controller
   {
      public ActionResult Index() {
         return View();
      }

      public ActionResult Task() {
         return View();
      }
   }
}