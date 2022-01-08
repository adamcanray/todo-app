import axios from "axios";
// import { TTask } from "../../../application/model";

const BASE_URL = "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0";

export function RestTaskList(): Promise<any> {
  return axios
    .get(`${BASE_URL}/to-do-list`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res: any) => ({ res }))
    .catch((err: any) => ({ err: err }));
}
