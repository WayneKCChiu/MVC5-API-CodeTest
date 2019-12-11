module App {
   var employeeApi = new EmployeeApi();

   new Vue({
      data: {
         employeeList: [] as IEmployeeData[],
         employeeData: {} as IEmployeeData,
         isCreate: true
      },
      el: `#home`,
      created: function () {
         employeeApi.GetEmployeeList({
            data: null,
            headers: { "Content-Type": "application/json" }
         }).then((response) => {
            if (response.data) {
               $.each(response.data, (key, value) => {
                  var date = moment(value.HiredDate).format("L");

                  value.HiredDate = date;

                  this.employeeList.push(value);
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
            if (this.isCreate) {
               employeeApi.CreateEmployee({
                  data: this.employeeData,
                  headers: { "Content-Type": "application/json" }
               }).then((response) => {
                  if (response.data.Success) {
                     var data = response.data.Data as IEmployeeData;

                     data.HiredDate = moment(data.HiredDate).format("L")

                     this.employeeList.push(data);
                     this.emptyEmployeeData();

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
               }).then((response) => {
                  if (response.data.Success) {
                     var data = response.data.Data as IEmployeeData;

                     $.each(this.employeeList, (key, value: IEmployeeData) => {
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
         "editEmployee": function (data: IEmployeeData) {
            var empData = this.copy(data);

            empData.HiredDate = moment(data.HiredDate).format("YYYY-MM-DD");

            this.employeeData = empData;
            this.isCreate = false;

            $("#create-employee").modal("show");
         },
         "deleteData": function (empID: number) {
            employeeApi.DeleteEmployee({
               data: empID,
               headers: { "Content-Type": "application/json" }
            }).then((response) => {
               if (response.data.Success) {
                  var data = response.data.Data as IEmployeeData[];

                  this.employeeList = [];

                  $.each(data, (key, value) => {
                     var date = moment(value.HiredDate).format("L");

                     value.HiredDate = date;

                     this.employeeList.push(value);
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
            } as IEmployeeData;
         },
         "copy": function (obj: any) {
            return JSON.parse(JSON.stringify(obj));
         }
      }
   });
}

