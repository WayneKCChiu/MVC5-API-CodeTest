using System.Web.Http;
using CodeTest.Models;
using Execute.IService;
using Execute.Models;

namespace CodeTest.Services
{
   public class EmployeeController: ApiController
   {
      private readonly IEmployeeApi _api;

      public EmployeeController(IEmployeeApi Api) {
         _api = Api;
      }

      [HttpPost]
      public JsonResult CreateEmployee(EmployeeData EmployeeData) {
         return _api.CreateEmployee(EmployeeData);
      }

      [HttpPost]
      public JsonResult UpdateEmployee(EmployeeData EmployeeData) {
         return _api.UpdateEmployee(EmployeeData);
      }

      [HttpPost]
      public JsonResult DeleteEmployee([FromBody]int EmpID) {
         return _api.DeleteEmployee(EmpID);
      }

      [HttpPost]
      public EmployeeData[] GetEmployeeList() {
         return _api.GetEmployeeList();
      }
   }
}