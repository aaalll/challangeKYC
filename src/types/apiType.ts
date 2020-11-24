export enum apiResponse {
    Y = "Y",
    N = "N",
    D = "D",
    S = "S",
}

export interface apiData {
    verifyDocumentResult?: Record<string, unknown>
    verificationRequestNumber?: string
    verificationResultCode: apiResponse
}