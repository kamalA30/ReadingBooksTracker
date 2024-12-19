const Joi = require('joi');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const schemaValidation = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'email', 'username', 'password'],
        properties: {
            name: {
                bsonType: 'string',
                minLength: 4,
                maxLength: 50
            },
            email: {
                bsonType: 'string',
                minLength: 5,
                maxLength: 100
                // Removed unique property here
            },
            username: {
                bsonType: 'string',
                minLength: 5,
                maxLength: 100
            },
            password: {
                bsonType: 'string',
                minLength: 8,
                maxLength: 1024
            }
        }
    }
};

const Taiktoken = (_id) => {
    const filePath = path.join(__dirname, '../configurations/tok.key');
    const secretKey = fs.readFileSync(filePath, 'utf8');
    const token = jwt.sign(
        { _id_user: _id },
        secretKey,
        { expiresIn: '1h' }
    );

    return token;
};

function validateUser(data) {
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().email().min(5).max(100).required(),
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string()
            .pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$'))
            .required()
    });

    return schema.validate(data);
}

exports.schemaValidation = schemaValidation;
exports.Taiktoken = Taiktoken;
exports.validateUser = validateUser;
