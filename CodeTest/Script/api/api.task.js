var TaskApi = /** @class */ (function () {
    function TaskApi() {
        this._api = new AppApi("Task");
    }
    TaskApi.prototype.GetTaskList = function (option) {
        return this._api.$Post("GetTaskList", option);
    };
    TaskApi.prototype.CreateTask = function (option) {
        return this._api.$Post("CreateTask", option);
    };
    TaskApi.prototype.UpdateTask = function (option) {
        return this._api.$Post("UpdateTask", option);
    };
    TaskApi.prototype.DeleteTask = function (option) {
        return this._api.$Post("DeleteTask", option);
    };
    return TaskApi;
}());
//# sourceMappingURL=api.task.js.map