interface IEmployeeData {
   EmpID: number;
   FirstName: string;
   LastName: string;
   HiredDate: any;
   IsDeleted: boolean;
}

interface ITaskData {
   TaskID: number;
   TaskName: string;
   StartTime: any;
   Deadline: any;
   IsCompleted: boolean;
   IsDeleted: boolean;
   EmployeeIDs: number[];
}

interface IJsonResult<T> {
   Data: T;
   Message: string;
   Success: boolean;
}

