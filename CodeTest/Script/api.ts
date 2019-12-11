class AppApi {
   constructor(private apiUrl: string) { }

   $Post<T>(ServiceName: string, post: IPost<any>): Axios.IPromise<Axios.AxiosXHR<T>> {
      const service = axios.create({});

      service.interceptors.request.use((config) => {
         return config;
      });

      service.interceptors.response.use((resp) => {
         return resp;
      });

      return service.post(`/Services/${this.apiUrl}/${ServiceName}`, post.data, {
         headers: post.headers
      });
   }

   $Get<T>(ServiceName: string, get: IGet<any>): Axios.IPromise<Axios.AxiosXHR<T>> {
      if (get.apiKey) {
         if (get.params) {
            get.params["Api"] = window["$ApiKey"];
         } else {
            get.params = { Api: window["$ApiKey"] };
         }
      }

      const service = axios.create({ headers: get.headers, params: get.params });

      service.interceptors.request.use((config) => {
         return config;
      });

      service.interceptors.response.use((resp) => {
         return resp;
      });

      return axios.get(get.url ? get.url : `/Services/${this.apiUrl}/${ServiceName}`, {
         headers: get.headers,
         params: get.params
      });
   }
}

interface IApis {
   headers?: { [key: string]: string };
   params?: { [key: string]: any };
   success?: any;
}

interface IHttp extends IApis {
   url?: string;
}

interface IPost<T> extends IHttp {
   data: T;
}

interface IGet<T> extends IHttp {
   data?: T;
   apiKey?: boolean;
}