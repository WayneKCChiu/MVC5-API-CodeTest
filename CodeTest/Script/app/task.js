var App;
(function (App) {
    var taskApi = new TaskApi();
    new Vue({
        data: {
            taskList: [],
            taskData: {},
            isCreate: true
        },
        el: "#task",
        created: function () {
            var _this = this;
            taskApi.GetTaskList({
                data: null,
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    $.each(response.data, function (key, value) {
                        var startdate = _this.dateFormatShow(value.StartTime);
                        var deadline = _this.dateFormatShow(value.Deadline);
                        value.StartTime = startdate;
                        value.Deadline = deadline;
                        _this.taskList.push(value);
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
                var _this = this;
                if (this.isCreate) {
                    taskApi.CreateTask({
                        data: this.taskData,
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        if (response.data.Success) {
                            var data = _this.copy(response.data.Data);
                            data.StartTime = _this.dateFormatShow(data.StartTime);
                            data.Deadline = _this.dateFormatShow(data.Deadline);
                            _this.taskList.push(data);
                            _this.emptyTaskData();
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
                    }).then(function (response) {
                        if (response.data.Success) {
                            var data = response.data.Data;
                            $.each(_this.taskList, function (key, value) {
                                if (data.TaskID == value.TaskID) {
                                    value.TaskName = data.TaskName;
                                    value.StartTime = _this.dateFormatShow(data.StartTime);
                                    value.Deadline = _this.dateFormatShow(data.Deadline);
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
            "editTask": function (data) {
                var task = this.copy(data);
                task.StartTime = this.dateFormatDash(data.StartTime);
                task.Deadline = this.dateFormatDash(data.Deadline);
                this.taskData = task;
                this.isCreate = false;
                $("#create-task").modal("show");
            },
            "deleteTask": function (taskID) {
                var _this = this;
                taskApi.DeleteTask({
                    data: taskID,
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if (response.data.Success) {
                        var data = response.data.Data;
                        _this.taskList = [];
                        $.each(data, function (key, value) {
                            var startdate = _this.dateFormatShow(value.StartTime);
                            var deadline = _this.dateFormatShow(value.Deadline);
                            value.StartTime = startdate;
                            value.Deadline = deadline;
                            _this.taskList.push(value);
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
                };
            },
            "copy": function (obj) {
                return JSON.parse(JSON.stringify(obj));
            },
            "dateFormatDash": function (date) {
                return moment(date).format("YYYY-MM-DD");
            },
            "dateFormatShow": function (date) {
                return moment(date).format("L");
            }
        }
    });
})(App || (App = {}));
//# sourceMappingURL=task.js.map