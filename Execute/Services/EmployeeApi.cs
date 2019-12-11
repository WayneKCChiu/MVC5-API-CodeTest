using System.Linq;
using App.Entity;
using CodeTest.Models;
using Execute.IService;
using Execute.Models;

namespace Execute.Services
{
   public class EmployeeApi: IEmployeeApi
   {
      public JsonResult CreateEmployee(EmployeeData EmployeeData) {
         if (EmployeeData == null) {
            return new JsonResult { Success = false, Message = "Data is empty", Data = null };
         }

         using (var db = EntityFactory.DbContext) {
            var data = new Employee { FirstName = EmployeeData.FirstName, LastName = EmployeeData.LastName, HiredDate = EmployeeData.HiredDate };

            db.Employees.Add(data);
            db.SaveChanges();

            return new JsonResult { Success = true, Message = "Create sccessful", Data = data };
         }
      }

      public JsonResult DeleteEmployee(int EmpID) {
         if (EmpID > 0) {
            using (var db = EntityFactory.DbContext) {
               var employee = db.Employees.SingleOrDefault(e => e.EmpID == EmpID);

               if (employee == null) {
                  return new JsonResult { Success = false, Message = "Employee doesn't exist", Data = null };
               }
               else {
                  employee.IsDeleted = true;

                  db.SaveChanges();

                  return new JsonResult { Success = true, Message = "Delete sccessful", Data = db.Employees.Where(e=> !e.IsDeleted).ToArray() };
               }
            }
         }
         else {
            return new JsonResult { Success = false, Message = "Employee doesn't exist", Data = null };
         }
      }

      public EmployeeData[] GetEmployeeList() {
         using (var db = EntityFactory.DbContext) {
            return db.Employees.Select(e => new EmployeeData {
               EmpID = e.EmpID,
               FirstName = e.FirstName,
               LastName = e.LastName,
               HiredDate = e.HiredDate,
               IsDeleted = e.IsDeleted
            }).ToArray();
         }
      }

      public JsonResult UpdateEmployee(EmployeeData EmployeeData) {
         if (EmployeeData == null) {
            return new JsonResult { Success = false, Message = "Employee doesn't exist", Data = null };
         }
         else {
            using (var db = EntityFactory.DbContext) {
               var employee = db.Employees.SingleOrDefault(e => e.EmpID == EmployeeData.EmpID);

               if (employee == null) {
                  return new JsonResult { Success = false, Message = "Employee doesn't exist", Data = null };
               }
               else {
                  employee.FirstName = EmployeeData.FirstName;
                  employee.LastName = EmployeeData.LastName;
                  employee.HiredDate = EmployeeData.HiredDate;
                  employee.IsDeleted = EmployeeData.IsDeleted;

                  db.SaveChanges();

                  return new JsonResult { Success = true, Message = "Update", Data = employee };
               }
            }
         }
      }
   }
}