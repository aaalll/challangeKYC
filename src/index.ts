import { validate } from "./middlewares/validate"

const test = {
    "birthDate": "1985-02-08",
    "givenName": "James",
    "middleName": "Robert",
    "familyName": "Smith",
    "licenceNumber": "94977000",
    "stateOfIssue": "NSW",
    "expiryDate": "2020-01-01"
}

validate(test)
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })