import { ClassConstructor, plainToClass } from "class-transformer";
import { validate as check } from "class-validator";
import { ValidationDetail, ValidationError } from "../api/v1/models/error_models";

async function validate<T,V>(cls: ClassConstructor<T>, plain: V | V[]): Promise<T> {
    const model = plainToClass(cls,plain);
    const result = await check(model as object);

    if(result.length>0) {
        const details:ValidationDetail[]  = result.map((error)=> ({
            property: error.property,
            reason: error.constraints ? Object.values(error.constraints)[0] : 'Invalid'
        }))
        throw new ValidationError('Input Validation Error', details);        
    }

    return model;
}

export default validate;
