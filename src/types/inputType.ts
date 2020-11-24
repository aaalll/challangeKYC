enum State {
    NSW = "NSW",
    QLD = "QLD",
    SA = "SA",
    TAS = "TAS",
    VIC = "VIC",
    WA = "WA",
    ACT = "ACT",
    NT = "NT"
}

export interface licenceData {
    birthDate: string
    givenName: string
    middleName?: string
    familyName: string
    licenceNumber: string
    stateOfIssue: State
    expiryDate?: string
}