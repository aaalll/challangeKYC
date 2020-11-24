import axios, { AxiosResponse } from "axios";
import config from "config";
import { licenceData } from "../types/inputType"

export const apiVerify = async (userData: licenceData): Promise<AxiosResponse<unknown>> => {
    const url = "" + config.get('endpoint');
    const token = "" + config.get('api_key');
    
    return axios({
        method: "post",
        url,
        headers: {
            token,
            "Content-Type": "application/json"
        },
        data: userData
    })
}
