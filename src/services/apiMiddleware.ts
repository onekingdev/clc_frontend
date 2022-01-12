import axios from "axios";
import { useSelector } from "react-redux";
import {
  apiCloudHostUrl,
  apiLocalhostUrl,
  apiStagingHostUrl,
  apiCloudDevUrl,
} from "../helpers/constants";
import {store} from "../redux/configureStore";
import * as AUTH_ACTIONS from "../containers/Authentication/store/actions";

const getApi = () => {
  if (process.env.NODE_ENV === "development") {
    // return apiCloudDevUrl;
    return apiLocalhostUrl;
  }
  if(process.env.GCLOUD_PROJECT == "devenvclc")  
    return apiCloudDevUrl;
  else
    return apiCloudHostUrl;
};

const api = {
  get: async (path: string) =>
    await axios
      .get(`${getApi()}/${path}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": store.getState().authState.user.token,
        },
      })
      .then((res: any) => res.data)
      .catch((error) => {
        if(error.response.status == 401 )  store.dispatch(AUTH_ACTIONS.logout((success)=> {}))
        return error;
      }),
  post: async (path: string, data: any, headers?: object) =>
       await axios
      .post(
        `${getApi()}/${path}`,
        data,
        headers
          ? headers
          : {
              headers: {
                "Content-Type": "application/json",
                "Authorization": store.getState().authState.user.token,
              },
            }
      )
      .then((res: any) => res.data)
      .catch((error) => {
        if(error.response.status == 401 )  store.dispatch(AUTH_ACTIONS.logout((success)=> {}))
        return error;
      }),
  put: async (path: string, data: any) =>
    await axios
      .put(`${getApi()}/${path}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": store.getState().authState.user.token,
        },
      })
      .then((res: any) => res.data)
      .catch((error) => {
        if(error.response.status == 401 )  store.dispatch(AUTH_ACTIONS.logout((success)=> {}))
        return error;
      }),
};

export default api;
