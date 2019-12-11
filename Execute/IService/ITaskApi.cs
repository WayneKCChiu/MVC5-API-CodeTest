using CodeTest.Models;
using Execute.Models;

namespace Execute.IService
{
   public interface ITaskApi
   {
      JsonResult UpdateTask(TaskData TaskData);
      JsonResult CreateTask(TaskData TaskData);
      TaskData[] GetTaksList();
      JsonResult DeleteTask(int TaskID);
   }
}