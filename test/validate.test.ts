import { expect } from "chai"
import sinon from "ts-sinon"

import * as callApi from "../src/controllers/apiVerify"
import { validate } from "../src/middlewares/validate"

describe('validate Input', () => {
    it("should return either Success or Api Error", async () => {
        const userData = {
            "birthDate": "1985-02-08",
            "givenName": "James",
            "middleName": "Robert",
            "familyName": "Smith",
            "licenceNumber": "94977000",
            "stateOfIssue": "NSW",
            "expiryDate": "2020-01-01"
        }
        try {
            const response = await validate(userData)
            expect(response).to.have.keys("kycResult")
        }
        catch (err) {
            expect(err).to.have.all.keys("code", "message")
        }
    })

    it("should return InvalidInput", async () => {
        const userData = {
            "middleName": "Robert",
            "familyName": "Smith",
            "licenceNumber": "94977000",
            "stateOfIssue": "NSW",
            "expiryDate": "2020-01-01"
        }
        try {
            const response = await validate(userData)
            expect(validate).to.throw(Error)
        }
        catch (err) {
            expect(err).to.have.all.keys("code", "message")
            expect(err.code).to.equal("I")
        }
    })
})

describe('validate - API', () => {
    let sandbox = sinon.createSandbox()
    beforeEach(function () {
        sandbox = sinon.createSandbox()
    });

    afterEach(function () {
        sandbox.restore();
    });

    const userData = {
        "birthDate": "1985-02-08",
        "givenName": "James",
        "middleName": "Robert",
        "familyName": "Smith",
        "licenceNumber": "94977000",
        "stateOfIssue": "NSW",
        "expiryDate": "2020-01-01"
    }
    const resolveRequest = (testResponce: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve(testResponce)
        })
    }

    it('should return Success', async () => {
        const sandboxStub = sandbox.stub(callApi, 'apiVerify')
        let testResponce = (
            {
                "data": {
                    "verificationResultCode": 'Y'
                }
            }
        )
        sandboxStub.returns(resolveRequest(testResponce))
        const response = await validate(userData)
        expect(validate).to.not.throw(Error)
        expect(response).to.have.property("kycResult").to.equal(true)
    })

    it('should return Success with kycResult = false', async () => {
        const sandboxStub = sandbox.stub(callApi, 'apiVerify')
        let testResponce = (
            {
                "data": {
                    "verificationResultCode": 'N',
                }
            }
        )
        sandboxStub.returns(resolveRequest(testResponce))
        const response = await validate(userData)
        expect(validate).to.not.throw(Error)
        expect(response).to.have.property("kycResult").to.equal(false)
    })

    it("should return Document Error", async () => {
        const sandboxStub = sandbox.stub(callApi, 'apiVerify')
        let testResponce = (
            {
                "data": {
                    "verificationResultCode": 'D',
                    "verificationRequestNumber": 0,
                }
            }
        )
        sandboxStub.returns(resolveRequest(testResponce))
        try {
            const response = await validate(userData)
            expect(validate).to.throw(Error)
        }
        catch (err) {
            expect(err).to.have.property("code").to.equal("D")
            expect(err).to.have.property("message").to.equal("Document Error")
        }
    })

    it("should return Server Error", async () => {
        const sandboxStub = sandbox.stub(callApi, 'apiVerify')
        let testResponce = (
            {
                "data": {
                    "verificationResultCode": 'S',
                }
            }
        )
        sandboxStub.returns(resolveRequest(testResponce))
        try {
            const response = await validate(userData)
            expect(validate).to.throw(Error)
        }
        catch (err) {
            expect(err).to.have.property("code").to.equal("S")
            expect(err).to.have.property("message").to.equal("Server Error")
        }
    })

    it("should return Invalid Response", async () => {
        const sandboxStub = sandbox.stub(callApi, 'apiVerify')
        let testResponce = (
            {
                "data": {
                    "verificationResult": 'S',
                }
            }
        )
        sandboxStub.returns(resolveRequest(testResponce))
        try {
            const response = await validate(userData)
            expect(validate).to.throw(Error)
        }
        catch (err) {
            expect(err).to.have.property("code").to.equal("O")
            expect(err).to.have.property("message").to.equal("Invalid Response")
        }
    })
})
