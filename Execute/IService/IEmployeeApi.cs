using CodeTest.Models;
using Execute.Models;

namespace Execute.IService
{
   public interface IEmployeeApi
   {
      EmployeeData[] GetEmployeeList();
      JsonResult UpdateEmployee(EmployeeData EmployeeData);
      JsonResult CreateEmployee(EmployeeData EmployeeData);
      JsonResult DeleteEmployee(int EmpID);
   }
}