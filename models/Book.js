const Joi = require('joi');



const schemaValidation = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['id_user', 'title', 'Author', 'NumberPagesBook', 'NumberPageRead', 'Categories', 'readingProgress'],
    properties: {
      id_user: {
        bsonType: 'string',
        description: "ID of the user, must be a string between 5 and 100 characters",
        minLength: 5,
        maxLength: 100
      },
      title: {
        bsonType: 'string',
        description: "Title of the book, must be a string between 5 and 50 characters",
        minLength: 5,
        maxLength: 50
      },
      Author: {
        bsonType: 'string',
        minLength: 5,
        maxLength: 50
      },
      NumberPagesBook: {
        bsonType: 'int',
        description: "Total number of pages in the book, must be an integer between 1 and 5000",
        minimum: 1,
        maximum: 5000
      },
      NumberPageRead: {
        bsonType: 'int',
        description: "Number of pages read, must be an integer between 1 and the total number of pages",
        minimum: 1,
        maximum: 5000
      },
      Categories: {
        bsonType: 'string',
        description: "Category of the book, must be a string between 5 and 50 characters",
        minLength: 5,
        maxLength: 50
      },
      readingProgress: {
        bsonType: 'string',
        description: "Reading progress as a percentage (e.g., '50%')",
        pattern: "^[0-9]{1,3}%$", // التحقق من أن القيمة مثل '50%'
      },
    },
  },
};


exports.schemaValidation = schemaValidation;

function validateBooks(data) {
  const schema = Joi.object({
    id_user: Joi.string().min(5).max(100).required(), 
    title: Joi.string().min(5).max(50).required(),
    Author: Joi.string().min(5).max(50).required(),
    NumberPagesBook: Joi.number().integer().min(1).max(5000).required(),
    NumberPageRead: Joi.number().integer().min(1).max(5000).required(),
    Categories: Joi.string().min(5).max(50).required(), 
    readingProgress: Joi.string().required() 
  });

  return schema.validate(data); 
}

exports.validateBooks = validateBooks;
