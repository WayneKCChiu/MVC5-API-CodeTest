using System.Linq;
using App.Entity;
using CodeTest.Models;
using Execute.IService;
using Execute.Models;

namespace Execute.Services
{
   public class TaskApi: ITaskApi
   {
      public JsonResult CreateTask(TaskData TaskData) {
         if (TaskData == null) {
            return new JsonResult { Success = false, Message = "Data is empty", Data = null };
         }

         using (var db = EntityFactory.DbContext) {
            var data = new Task {
               StartTime = TaskData.StartTime,
               Deadline = TaskData.Deadline,
               TaskName = TaskData.TaskName
            };

            db.Tasks.Add(data);
            db.SaveChanges();

            return new JsonResult { Success = true, Message = "Create sccessful", Data = data };
         }
      }

      public JsonResult DeleteTask(int TaskID) {
         if (TaskID > 0) {
            using (var db = EntityFactory.DbContext) {
               var task = db.Tasks.SingleOrDefault(e => e.TaskID == TaskID);

               if (task == null) {
                  return new JsonResult { Success = false, Message = "Task doesn't exist", Data = null };
               }
               else {
                  task.IsDeleted = true;

                  db.SaveChanges();

                  return new JsonResult { Success = true, Message = "Delete sccessful", Data = db.Tasks.ToArray() };
               }
            }
         }
         else {
            return new JsonResult { Success = false, Message = "Task doesn't exist", Data = null };
         }
      }

      public TaskData[] GetTaksList() {
         using (var db = EntityFactory.DbContext) {
            return db.Tasks.Select(t => new TaskData {
               TaskID = t.TaskID,
               TaskName = t.TaskName,
               StartTime = t.StartTime,
               Deadline = t.Deadline,
               IsCompleted = t.IsCompleted,
               IsDeleted = t.IsDeleted
            }).ToArray();
         }
      }

      public JsonResult UpdateTask(TaskData TaskData) {
         if (TaskData == null) {
            return new JsonResult { Success = false, Message = "Task doesn't exist", Data = null };
         }
         else {
            using (var db = EntityFactory.DbContext) {
               var task = db.Tasks.SingleOrDefault(e => e.TaskID == TaskData.TaskID);

               if (task == null) {
                  return new JsonResult { Success = false, Message = "Task doesn't exist", Data = null };
               }
               else {
                  task.TaskName = TaskData.TaskName;
                  task.StartTime = TaskData.StartTime;
                  task.Deadline = TaskData.Deadline;
                  task.IsCompleted = TaskData.IsCompleted;
                  task.IsDeleted = TaskData.IsDeleted;

                  db.SaveChanges();

                  return new JsonResult { Success = true, Message = "Update", Data = task };
               }
            }
         }
      }
   }
}