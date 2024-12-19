const { Router } = require('express');
const BookController = require('../controllers/BookController');
const { tokenUser } = require('../middlewares/index');

const router = Router();

router.post('/createBook', tokenUser, BookController.createBook)
    .post('/UpdatBook', tokenUser, BookController.UpdatBook)
    .get('/ViewTitleAndAuthor', tokenUser, BookController.ViewTitleAndAuthor)
    .get('/ViewByCategory/:category', tokenUser, BookController.ViewByCategory)
    .delete('/remove/:id', tokenUser, BookController.deleteBook);







module.exports = router;
