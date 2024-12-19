const BaseController = require('../controllers/BaseController');
const { ObjectId } = require('mongodb');

const { validateBooks, schemaValidation } = require('../models/Book');


class BookController extends BaseController {

    static async createBook(req, res, next) {

        const NumberPagesBook = req.body.NumberPagesBook
        const NumberPageRead = req.body.NumberPageRead

        const readingProgress = (NumberPageRead / NumberPagesBook) * 100;
        const schema = {
            id_user: req.body._id_user,
            Author: req.body.Author,
            title: req.body.title,
            NumberPagesBook: req.body.NumberPagesBook,
            NumberPageRead: req.body.NumberPageRead,
            Categories: req.body.Categories,
            readingProgress: `${readingProgress.toFixed(2)}%`
        };

        const { error } = validateBooks(schema);
        if (error) return res.status(400).send(error.details[0].message);


        await super.create('Book', schemaValidation, schema, (status) => {
            if (status.status) {
                return res.status(201).json({
                    status: true,
                    message: " created successfully "
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: status.message
                })

            }
        });

    }


    static async UpdatBook(req, res, next) {
        try {
            const schema = {
                _id: req.body._id,
                Author: req.body.Author,
                title: req.body.title,
                NumberPagesBook: req.body.NumberPagesBook,
                NumberPageRead: req.body.NumberPageRead,
                Categories: req.body.Categories,
            };

            if (schema.NumberPageRead) {
                const options = { _id: new ObjectId(schema._id) };

                await super.getbyOne('Book', schemaValidation, options, (status) => {
                    if (status.status) {
                        const NumberPagesBook = status.Data.NumberPagesBook;
                        const NumberPageRead = schema.NumberPageRead;
                        const readingProgress = (NumberPageRead / NumberPagesBook) * 100;
                        schema.readingProgress = `${readingProgress}%`; // تحويل نسبة التقدم إلى نص
                    } else {
                        return res.status(401).json({
                            status: false,
                            message: 'Books not found',
                        });
                    }
                });
            }


            await super.update('Book', schemaValidation, schema, (status) => {
                if (status.status) {
                    return res.status(201).json({
                        status: true,
                        message: "Update successfully"
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: status.message
                    });
                }
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                status: false,
                message: err.message
            });
        }
    }


    static async deleteBook(req, res, next) {
        const _id = req.params.id;
        if (!_id) {
            return res.status(400).json({ message: 'Invalid _id format' });
        }
        await super.deleteById('Book', schemaValidation, _id, (status) => {
            if (!status.status) {
                return res.status(404).json({
                    status: false,
                    message: status.message || 'Error occurred while removing the image'
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: "Books has been removed successfully",
                    result: status.result
                });
            }
        });



    }

    static async ViewTitleAndAuthor(req, res, next) {
        const { title, Author } = req.query;
        if (!title || !Author) {
            return res.status(400).json({ message: 'Please provide both title and author' });
        }
        const options = { title: title, Author: Author };



        await super.getbyOne('Book', schemaValidation, options, (status) => {
            if (status.status) {
                return res.status(201).json({
                    status: true,
                    data: status.Data
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: status.message
                })

            }
        });

    }



    static async ViewByCategory(req, res, next) {
        const categoryName = req.params.category;
        if (!categoryName) {
            return res.status(400).json({ message: 'Please provide category' });
        }
        const options = { Categories: categoryName }


        await super.getbyAll('Book', schemaValidation, options, (status) => {
            if (status.status) {
                return res.status(201).json({
                    status: true,
                    data: status.itemsData
                })
            } else {
                return res.status(400).json({
                    status: false,
                    message: status.message
                })

            }
        });

    }



}

module.exports = BookController

