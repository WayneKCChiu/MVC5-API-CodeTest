module App {
   var taskApi = new TaskApi();

   new Vue({
      data: {
         taskList: [] as ITaskData[],
         taskData: {} as ITaskData,
         isCreate: true
      },
      el: `#task`,
      created: function () {
         taskApi.GetTaskList({
            data: null,
            headers: { "Content-Type": "application/json" }
         }).then((response) => {
            if (response.data) {
               $.each(response.data, (key, value: ITaskData) => {
                  var startdate = this.dateFormatShow(value.StartTime);
                  var deadline = this.dateFormatShow(value.Deadline);

                  value.StartTime = startdate;
                  value.Deadline = deadline;

                  this.taskList.push(value);
               });
            }
         });

         this.emptyTaskData();
      },
      methods: {
         "createTask": function () {
            this.emptyTaskData();
            this.isCreate = true;
            $("#create-task").modal("show");
         },
         "updateTask": function () {
            if (this.isCreate) {
               taskApi.CreateTask({
                  data: this.taskData,
                  headers: { "Content-Type": "application/json" }
               }).then((response) => {
                  if (response.data.Success) {
                     var data = this.copy(response.data.Data) as ITaskData;

                     data.StartTime = this.dateFormatShow(data.StartTime);
                     data.Deadline = this.dateFormatShow(data.Deadline);

                     this.taskList.push(data);
                     this.emptyTaskData();

                     $("#create-task").modal("hide");
                  }
                  else {
                     window.alert(response.data.Message);
                  }
               });
            }
            else {
               taskApi.UpdateTask({
                  data: this.taskData,
                  headers: { "Content-Type": "application/json" }
               }).then((response) => {
                  if (response.data.Success) {
                     var data = response.data.Data as ITaskData;

                     $.each(this.taskList, (key, value: ITaskData) => {
                        if (data.TaskID == value.TaskID) {
                           value.TaskName = data.TaskName;
                           value.StartTime = this.dateFormatShow(data.StartTime);
                           value.Deadline = this.dateFormatShow(data.Deadline);
                           value.IsDeleted = data.IsDeleted;
                           value.IsCompleted = data.IsCompleted;
                        }
                     });

                     $("#create-task").modal("hide");
                  }
                  else {
                     window.alert(response.data.Message);
                  }
               });
            }
         },
         "editTask": function (data: ITaskData) {
            var task = this.copy(data) as ITaskData;

            task.StartTime = this.dateFormatDash(data.StartTime);
            task.Deadline = this.dateFormatDash(data.Deadline);

            this.taskData = task;
            this.isCreate = false;

            $("#create-task").modal("show");
         },
         "deleteTask": function (taskID: number) {
            taskApi.DeleteTask({
               data: taskID,
               headers: { "Content-Type": "application/json" }
            }).then((response) => {
               if (response.data.Success) {
                  var data = response.data.Data as ITaskData[];

                  this.taskList = [];

                  $.each(data, (key, value) => {
                     var startdate = this.dateFormatShow(value.StartTime);
                     var deadline = this.dateFormatShow(value.Deadline);

                     value.StartTime = startdate;
                     value.Deadline = deadline

                     this.taskList.push(value);
                  });
               }
               else {
                  window.alert(response.data.Message);
               }
            });
         },
         "emptyTaskData": function () {
            this.TaskData = {
               TaskName: "",
               StartTime: null,
               Deadline: null,
               IsCompleted: false,
               IsDeleted: false
            } as ITaskData;
         },
         "copy": function (obj: any) {
            return JSON.parse(JSON.stringify(obj));
         },
         "dateFormatDash": function (date: any) {
            return moment(date).format("YYYY-MM-DD");
         },
         "dateFormatShow": function (date: any) {
            return moment(date).format("L");
         }
      }
   });
}

