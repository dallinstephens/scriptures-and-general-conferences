var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Scripture = require('../models/scripture');

router.get('/', (req, res, next) => {
    Scripture.find()
        .then(scriptures => {
            res.status(200).json({
                message: 'Scriptures fetched successfully!',
                scriptures: scriptures
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
    const maxScriptureId = sequenceGenerator.nextId("scriptures");

    const scripture = new Scripture({
        id: maxScriptureId,
        scripturePassage: req.body.scripturePassage,
        scriptureLink: req.body.scriptureLink,
        keywords: req.body.keywords,
        scriptureImageLink: req.body.scriptureImageLink,
        questionOrTopic: req.body.questionOrTopic,
        note: req.body.note
    });        
    
    scripture.save()
        .then(createdScripture => {
            res.status(201).json({
                message: 'Scripture added successfully!',
                scripture: createdScripture
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
    Scripture.findOne({ id: req.params.id })
        .then(scripture => {
            scripture.scripturePassage = req.body.scripturePassage;
            scripture.scriptureLink = req.body.scriptureLink;
            scripture.keywords = req.body.keywords;
            scripture.scriptureImageLink = req.body.scriptureImageLink;
            scripture.questionOrTopic = req.body.questionOrTopic;
            scripture.note = req.body.note;

            Scripture.updateOne({ id: req.params.id }, scripture)
                .then(result => {
                    res.status(204).json({
                        message: 'Scripture updated successfully!'
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
                message: "Scripture not found!",
                error: { scripture: 'Scripture not found! Error: ' + err }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Scripture.findOne({ id: req.params.id })
        .then(scripture => {
            Scripture.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: 'Scripture deleted successfully!'
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
                message: 'Scripture not found!',
                error: 'Scripture not found! Error: ' + err
            });
        });
});

module.exports = router;