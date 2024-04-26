import axios, {  AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from "axios";
import environment from "../Constant";

export interface RequestOptions extends AxiosRequestConfig {
  endPoint: string;
  method?: Method | string;
  options?: any;
}
const token = String(localStorage.getItem('token'))
const id = Number(localStorage.getItem('id'))


async function MyfetchMiddleWare({
  endPoint,
  method = "get" as Method,
  options,
}: RequestOptions): Promise<AxiosResponse | any> {
  console.log("method:", method, "url:", endPoint, "options:", options);
  const methods: Method[] = ["get", "post", "put", "patch", "delete"];

  // const APIBase: string = `${environment.IP_ADDRESS}:${environment.SERVER_PORT}`;
  const APIBase: string = `${environment.baseUrl}`;

  const commonHeader: Record<string, string> = {
    "content-type": "application/json", // Corrected content type
    // aurthorization: token
  };
  console.log('user_ID: ', id, 'token: ', token)

  const CommonBody: Record<string, any> = {
    // userID: id,
  };

  let baseUrl = `${APIBase}/${endPoint}`;
  if (options) {
    options.headers = { ...commonHeader, ...options.headers };
    options.data = { ...CommonBody, ...options.data };
  } else {
    options = { headers: { ...commonHeader }, data: { ...CommonBody } };
  }
  if (JSON.stringify(options.data)) {
    if (methods.includes(method.toLowerCase() as Method)) {
      try {
        const responseData = await (
          axios[method.toLowerCase() as keyof typeof axios] as (
            url: string,
            data: AxiosRequestConfig,
            config?: AxiosRequestHeaders
          ) => Promise<AxiosResponse>
        )(baseUrl, options.data,options.headers);
        console.log("Response: ", responseData);
        return responseData;
      } catch (error) {
        console.error("Error:", error);
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export default MyfetchMiddleWare;
