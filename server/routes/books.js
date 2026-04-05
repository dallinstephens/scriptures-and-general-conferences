var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Book = require('../models/book');

router.get('/', (req, res, next) => {
    Book.find()
        .then(books => {
            res.status(200).json({
                message: 'Books fetched successfully!',
                books: books
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: 'An error occurred!',
                error: err
            })
        })
});

router.post('/', (req, res, next) => {
    const maxBookId = sequenceGenerator.nextId("books");

    const book = new Book({
        id: maxBookId,
        bookName: req.body.bookName,
        bookLink: req.body.bookLink,
        keywords: req.body.keywords,
        bookImageLink: req.body.bookImageLink,
        questionsOrTopics: req.body.questionsOrTopics,
        notes: req.body.notes
    });        
    
    book.save()
        .then(createdBook => {
            res.status(201).json({
                message: 'Book added successfully!',
                book: createdBook
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'An error occurred!',
                error: err
            });
        });
});

router.put('/:id', (req, res, next) => {
    Book.findOne({ id: req.params.id })
        .then(book => {
            book.bookName = req.body.bookName;
            book.bookLink = req.body.bookLink;
            book.keywords = req.body.keywords;
            book.bookImageLink = req.body.bookImageLink;
            book.questionsOrTopics = req.body.questionsOrTopics;
            book.notes = req.body.notes;

            Book.updateOne({ id: req.params.id }, book)
                .then(result => {
                    res.status(204).json({
                        message: 'Book updated successfully!'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'An error occurred!',
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: "Book not found!",
                error: { book: 'Book not found! Error: ' + err }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Book.findOne({ id: req.params.id })
        .then(book => {
            Book.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: 'Book deleted successfully!'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'An error occurred!',
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Book not found!',
                error: 'Book not found! Error: ' + err
            });
        });
});

module.exports = router;