var EmployeeApi = /** @class */ (function () {
    function EmployeeApi() {
        this._api = new AppApi("Employee");
    }
    EmployeeApi.prototype.GetEmployeeList = function (option) {
        return this._api.$Post("GetEmployeeList", option);
    };
    EmployeeApi.prototype.CreateEmployee = function (option) {
        return this._api.$Post("CreateEmployee", option);
    };
    EmployeeApi.prototype.UpdateEmployee = function (option) {
        return this._api.$Post("UpdateEmployee", option);
    };
    EmployeeApi.prototype.DeleteEmployee = function (option) {
        return this._api.$Post("DeleteEmployee", option);
    };
    return EmployeeApi;
}());
//# sourceMappingURL=api.employee.js.map