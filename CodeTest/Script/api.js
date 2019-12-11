var AppApi = /** @class */ (function () {
    function AppApi(apiUrl) {
        this.apiUrl = apiUrl;
    }
    AppApi.prototype.$Post = function (ServiceName, post) {
        var service = axios.create({});
        service.interceptors.request.use(function (config) {
            return config;
        });
        service.interceptors.response.use(function (resp) {
            return resp;
        });
        return service.post("/Services/" + this.apiUrl + "/" + ServiceName, post.data, {
            headers: post.headers
        });
    };
    AppApi.prototype.$Get = function (ServiceName, get) {
        if (get.apiKey) {
            if (get.params) {
                get.params["Api"] = window["$ApiKey"];
            }
            else {
                get.params = { Api: window["$ApiKey"] };
            }
        }
        var service = axios.create({ headers: get.headers, params: get.params });
        service.interceptors.request.use(function (config) {
            return config;
        });
        service.interceptors.response.use(function (resp) {
            return resp;
        });
        return axios.get(get.url ? get.url : "/Services/" + this.apiUrl + "/" + ServiceName, {
            headers: get.headers,
            params: get.params
        });
    };
    return AppApi;
}());
//# sourceMappingURL=api.js.map