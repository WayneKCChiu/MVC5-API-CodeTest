class TaskApi {
   _api = new AppApi(`Task`);

   GetTaskList(option: IPost<any>): Axios.IPromise<Axios.AxiosXHR<ITaskData[]>> {
      return this._api.$Post<ITaskData[]>("GetTaskList", option);
   }

   CreateTask<T>(option: IPost<any>): Axios.IPromise<Axios.AxiosXHR<IJsonResult<T>>> {
      return this._api.$Post<IJsonResult<T>>("CreateTask", option);
   }

   UpdateTask<T>(option: IPost<any>): Axios.IPromise<Axios.AxiosXHR<IJsonResult<T>>> {
      return this._api.$Post<IJsonResult<T>>("UpdateTask", option);
   }

   DeleteTask<T>(option: IPost<any>): Axios.IPromise<Axios.AxiosXHR<IJsonResult<T>>> {
      return this._api.$Post<IJsonResult<T>>("DeleteTask", option);
   }
}