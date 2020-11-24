import { apiVerify } from "../controllers/apiVerify"
import { licenceData } from "../types/inputType"
import { apiData, apiResponse } from "../types/apiType"
import { inputSchemaValidation } from "../models/inputSchema"
import { responseSchemaValidation } from "../models/responseSchema"
import { errorResponse, successResponse } from "../types/returnType"

const validateInput = (userData: unknown): userData is licenceData => {
    const valid = inputSchemaValidation.validate(userData);
    if (!!valid.error) {
        const error = {
            code: "I",
            message: "Invalid Input"
        }
        throw(error)
    }
    else return true
}

const validateResponse = (responseData: unknown): responseData is apiData => {
    const valid = responseSchemaValidation.validate(responseData);
    if (!!valid.error) {
        const error = {
            code: "O",
            message: "Invalid Response"
        }
        throw(error)
    }
    else return true
}

const parseKYCResponse = (value: apiResponse): successResponse | errorResponse=> {
    switch (value) {
        case "Y":
            return {
                "kycResult": true
            }
        case "N":
            return {
                "kycResult": false
            }
        case "D":
            throw ({
                "code": "D",
                "message": "Document Error"
            })
        case "S":
            throw ({
                "code": "S",
                "message": "Server Error"
            })
        default:
            throw ({
                "code": "S",
                "message": "Server Error"
            })
    }
}

export const validate = (userData: unknown): Promise<successResponse | errorResponse> => {
    return new Promise((resolve, reject) => {
        try{
            validateInput(userData)
            const response = apiVerify(userData as licenceData)
            response.then((response) => {
                validateResponse(response.data)
                const kycResponse = response.data as apiData
                const kycResult = parseKYCResponse(kycResponse.verificationResultCode)
                resolve(kycResult) 
            }).catch((error) => {
                if (typeof error === "object" && "code" in error)
                    reject(error)
                else {
                    reject({
                        "code": "S",
                        "message": "Server Error"
                    })
                }
            })
        }
        catch(error){
            reject(error)
        }
    })
}

