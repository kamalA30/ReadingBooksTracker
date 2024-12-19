const dbConnect = require('../configurations/db');
const { ObjectId } = require('mongodb');

class BaseController {

    static create(collection, validationRule, data, cb) {
        try {
            dbConnect(collection, validationRule, async (db) => {
                await db.insertOne(data);
                cb({
                    status: true,
                    message: 'Successfully added'
                });
            });
        } catch (error) {
            cb({
                status: false,
                message: error.message
            });
        }
    }

    static deleteById(collection, validationRule, _id, cb) {
        try {
            dbConnect(collection, validationRule, async (db) => {
                const objectId = new ObjectId(_id); 
                const result = await db.deleteOne({ _id: objectId });

                if (result.deletedCount === 0) { 
                    return cb({
                        status: false,
                        message: "Item not found"
                    });
                }

                cb({
                    status: true,
                    message: "Item deleted successfully"
                });
            });
        } catch (error) {
            cb({
                status: false,
                message: error.message 
            });
        }
    }



    static async update(collection, validationRule, schema, cb) {
        try {
            await dbConnect(collection, validationRule, async (db) => {
                await db.updateOne({
                    _id: new ObjectId(schema._id)
                },
                    {
                        $set: {
                           Author: schema.Author,
                            title: schema.title,
                            NumberPagesBook: schema.NumberPagesBook,
                            NumberPageRead: schema.NumberPageRead,
                            Categories: schema.Categories,
                            readingProgress: schema.readingProgress
                        }
                    },
                    {
                        upsert: false
                    });

                cb({
                    status: true,
                    message: 'Successfully updated'
                });
            });
        } catch (error) {
            cb({
                status: false,
                message: error.message
            });
        }
    }



    static getbyAll(collection, validationRule, filter, cb) {
        try {
            dbConnect(collection, validationRule, async (db) => {
                const items = await db.find(filter).toArray();

                cb({
                    status: true,
                    itemsData: items
                });
            });
        } catch (error) {
            cb({
                status: false,
                message: error.message 
            });
        }
    }

    static getbyOne(collection, validationRule, options, cb) {
        try {
            dbConnect(collection, validationRule, async (db) => {
                const item = await db.findOne(options);  
                if (!item) {
                    return cb({
                        status: false,
                        message: 'Item not found'
                    });
                }

                cb({
                    status: true,
                    Data: item
                });
            });
        } catch (error) {
            cb({
                status: false,
                message: error.message 
            });
        }
    }
}

module.exports = BaseController;
