const userRouter = require('./User');
const bookRouter = require('./book')

module.exports = (app) => {
    app.use('/user', userRouter)
        .use('/book', bookRouter)

};
