import Joi from 'joi';

const schema = Joi.object({
    birthDate: Joi.string()
        .pattern(new RegExp(/^\d{4}-\d{2}-\d{2}$/))
        .required(),

    givenName: Joi.string()
        .max(100)
        .required(),

    middleName: Joi.string()
        .max(100),

    familyName: Joi.string()
        .max(100)
        .required(),

    licenceNumber: Joi.string()
        .required(),

    stateOfIssue: Joi.string().allow("NSW", "QLD", "SA", "TAS", "VIC", "WA", "ACT", "NT"),

    expiryDate: Joi.string()
        .pattern(new RegExp(/^\d{4}-\d{2}-\d{2}$/)),

});

export const inputSchemaValidation = schema