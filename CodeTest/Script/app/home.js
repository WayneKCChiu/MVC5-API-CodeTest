var App;
(function (App) {
    var employeeApi = new EmployeeApi();
    new Vue({
        data: {
            employeeList: [],
            employeeData: {},
            isCreate: true
        },
        el: "#home",
        created: function () {
            var _this = this;
            employeeApi.GetEmployeeList({
                data: null,
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    $.each(response.data, function (key, value) {
                        var date = moment(value.HiredDate).format("L");
                        value.HiredDate = date;
                        _this.employeeList.push(value);
                    });
                }
            });
            this.emptyEmployeeData();
        },
        methods: {
            "createEmployee": function () {
                this.emptyEmployeeData();
                this.isCreate = true;
                $("#create-employee").modal("show");
            },
            "updateEmployee": function () {
                var _this = this;
                if (this.isCreate) {
                    employeeApi.CreateEmployee({
                        data: this.employeeData,
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        if (response.data.Success) {
                            var data = response.data.Data;
                            data.HiredDate = moment(data.HiredDate).format("L");
                            _this.employeeList.push(data);
                            _this.emptyEmployeeData();
                            $("#create-employee").modal("hide");
                        }
                        else {
                            window.alert(response.data.Message);
                        }
                    });
                }
                else {
                    employeeApi.UpdateEmployee({
                        data: this.employeeData,
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        if (response.data.Success) {
                            var data = response.data.Data;
                            $.each(_this.employeeList, function (key, value) {
                                if (data.EmpID == value.EmpID) {
                                    value.FirstName = data.FirstName;
                                    value.LastName = data.LastName;
                                    value.HiredDate = moment(data.HiredDate).format("L");
                                    value.IsDeleted = data.IsDeleted;
                                }
                            });
                            $("#create-employee").modal("hide");
                        }
                        else {
                            window.alert(response.data.Message);
                        }
                    });
                }
            },
            "editEmployee": function (data) {
                var empData = this.copy(data);
                empData.HiredDate = moment(data.HiredDate).format("YYYY-MM-DD");
                this.employeeData = empData;
                this.isCreate = false;
                $("#create-employee").modal("show");
            },
            "deleteData": function (empID) {
                var _this = this;
                employeeApi.DeleteEmployee({
                    data: empID,
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if (response.data.Success) {
                        var data = response.data.Data;
                        _this.employeeList = [];
                        $.each(data, function (key, value) {
                            var date = moment(value.HiredDate).format("L");
                            value.HiredDate = date;
                            _this.employeeList.push(value);
                        });
                    }
                    else {
                        window.alert(response.data.Message);
                    }
                });
            },
            "emptyEmployeeData": function () {
                this.employeeData = {
                    EmpID: 0,
                    FirstName: "",
                    LastName: "",
                    HiredDate: null,
                    IsDeleted: false
                };
            },
            "copy": function (obj) {
                return JSON.parse(JSON.stringify(obj));
            }
        }
    });
})(App || (App = {}));
//# sourceMappingURL=home.js.map