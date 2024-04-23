import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import environment from "../Constant";

export interface RequestOptions extends AxiosRequestConfig {
  endPoint: string;
  method?: Method | string;
  options: any;
}

async function MyfetchMiddleWare({
  endPoint,
  method = "get" as Method,
  options,
}: RequestOptions): Promise<AxiosResponse | any> {
  console.log("method:", method, "url:", endPoint, "options:", options);
  const methods: Method[] = ["get", "post", "put", "patch", "delete"];

  const APIBase: string = `${environment.IP_ADDRESS}:${environment.SERVER_PORT}`;

  const commonHeader: Record<string, string> = {
    "content-type": "application/json", // Corrected content type
  };

  const CommonBody: Record<string, any> = {
    userID: 123,
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
            config?: AxiosRequestConfig
          ) => Promise<AxiosResponse>
        )(baseUrl, options);
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
