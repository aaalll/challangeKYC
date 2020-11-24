import Joi from 'joi';

const schema = Joi.object({
    verificationDocumentResult: Joi.object(),

    verificationRequestNumber: Joi.number(),

    verificationResultCode: Joi.string()
        .allow("Y", "N", "D", "S")
        .required(),
});

export const responseSchemaValidation = schema