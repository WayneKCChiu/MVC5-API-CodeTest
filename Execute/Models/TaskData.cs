using System;

namespace Execute.Models
{
   public class TaskData
   {
      public int TaskID;
      public string TaskName;
      public DateTime StartTime;
      public DateTime Deadline;
      public bool IsCompleted;
      public bool IsDeleted;
      public int[] EmployeeIDs;
   }
}