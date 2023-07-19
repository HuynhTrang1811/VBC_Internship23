import { Joi, Segments } from "celebrate";

const signInDTO = {
    [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }
}

const signUpDTO = {
    [Segments.BODY]: {
        fullname: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
    }
}

export default {
    signInDTO,
    signUpDTO
}