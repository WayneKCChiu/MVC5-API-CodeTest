class EmployeeApi {
   _api = new AppApi(`Employee`);

   GetEmployeeList(option: IPost<any>): Axios.IPromise<Axios.AxiosXHR<IEmployeeData[]>> {
      return this._api.$Post<IEmployeeData[]>("GetEmployeeList", option);
   }

   CreateEmployee<T>(option: IPost<any>): Axios.IPromise<Axios.AxiosXHR<IJsonResult<T>>> {
      return this._api.$Post<IJsonResult<T>>("CreateEmployee", option);
   }

   UpdateEmployee<T>(option: IPost<any>): Axios.IPromise<Axios.AxiosXHR<IJsonResult<T>>> {
      return this._api.$Post<IJsonResult<T>>("UpdateEmployee", option);
   }

   DeleteEmployee<T>(option: IPost<any>): Axios.IPromise<Axios.AxiosXHR<IJsonResult<T>>> {
      return this._api.$Post<IJsonResult<T>>("DeleteEmployee", option);
   }
}