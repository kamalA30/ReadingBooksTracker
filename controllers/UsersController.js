const BaseController = require('../controllers/BaseController');
const { schemaValidation, validateUser, Taiktoken } = require('../models/User');
const { hashSync, compareSync } = require('bcryptjs');

class UsersController extends BaseController {

    static async signup(req, res, next) {
        const schema = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };

        const { error } = validateUser(schema);
        if (error) return res.status(400).send(error.details[0].message);

        const options = { email: schema.email };



        await super.getbyOne('User', schemaValidation, options, (status) => {
            if (status.status) {
                return res.status(401).json({
                    status: false,
                    message: "email is used "
                });
            }
        })





        schema.password = hashSync(schema.password, 12);

        await super.create('User', schemaValidation, schema, (status) => {
            if (status.status) {
                return res.status(201).json({
                    status: true,
                    message: "User created successfully"
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: status.message
                });
            }
        });
    }

    static async login(req, res, next) {
        const schema = {
            username: req.body.username,
            password: req.body.password
        };
        if (!schema.username || !schema.password) {
            return res.status(400).json({ message: 'Please provide both username and password' });
        }

        const options = { username: schema.username };


        await super.getbyOne('User', schemaValidation, options, (status) => {
            if (status.status) {
                if (!compareSync(schema.password, status.Data.password)) {
                    return res.status(401).json({
                        status: false,
                        message: 'Invalid password'
                    });
                } else {
                    const token = Taiktoken(status.Data._id);
                    return res.status(201).json({
                        status: true,
                        user: status.Data,
                        token: token
                    });
                }
            } else {
                return res.status(401).json({
                    status: false,
                    message: 'User not found'
                });
            }
        });
    }

}

module.exports = UsersController;
