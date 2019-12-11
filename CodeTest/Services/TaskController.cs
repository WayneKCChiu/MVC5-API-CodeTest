using System.Web.Http;
using CodeTest.Models;
using Execute.IService;
using Execute.Models;

namespace CodeTest.Services
{
   public class TaskController: ApiController
   {
      private readonly ITaskApi _api;

      public TaskController(ITaskApi Api) {
         _api = Api;
      }

      [HttpPost]
      public JsonResult CreateTask(TaskData TaskData) {
         return _api.CreateTask(TaskData);
      }

      [HttpPost]
      public JsonResult UpdateTask(TaskData TaskData) {
         return _api.UpdateTask(TaskData);
      }

      [HttpPost]
      public JsonResult DeleteTask([FromBody]int TaskID) {
         return _api.DeleteTask(TaskID);
      }

      [HttpPost]
      public TaskData[] GetTaskList() {
         return _api.GetTaksList();
      }
   }
}