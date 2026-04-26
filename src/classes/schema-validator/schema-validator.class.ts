import Joi from "joi";

export abstract class SchemaValidator <Schema> {
    protected abstract schemaValObj: Joi.ObjectSchema<Schema>
    
    validate (targetSchema: Schema) {
        return this.schemaValObj.required().validate(JSON.parse(JSON.stringify(targetSchema)))
    }

    getSchemaValidationObject() {
        return this.schemaValObj
    }
}