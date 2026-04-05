var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Generalconference = require('../models/generalconference');

router.get('/', (req, res, next) => {
    Generalconference.find()
        .then(generalconferences => {
            res.status(200).json({
                message: 'General Conferences fetched successfully!',
                generalconferences: generalconferences
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
    const maxGeneralconferenceId = sequenceGenerator.nextId("generalconferences");

    const generalconference = new Generalconference({
        id: maxGeneralconferenceId,
        generalconferenceSpeaker: req.body.generalconferenceSpeaker,
        generalconferenceReadLink: req.body.generalconferenceReadLink,
        paragraphToJumpToLink: req.body.paragraphToJumpToLink,
        keywords: req.body.keywords,
        generalconferenceYoutubeLink: req.body.generalconferenceYoutubeLink,
        youtubeStartTimeInSec: req.body.youtubeStartTimeInSec,
        youtubeEndTimeInSec: req.body.youtubeEndTimeInSec,
        generalconferenceMonthYear: req.body.generalconferenceMonthYear,
        generalconferenceTalkTitle: req.body.generalconferenceTalkTitle,
        generalconferenceSpeakerImageLink: req.body.generalconferenceSpeakerImageLink,        
        questionsOrTopics: req.body.questionsOrTopics,
        notes: req.body.notes
    });
    
    generalconference.save()
        .then(createdGeneralconference => {
            res.status(201).json({
                message: 'General Conference added successfully!',
                generalconference: createdGeneralconference
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
    Generalconference.findOne({ id: req.params.id })
        .then(generalconference => {
            generalconference.generalconferenceSpeaker = req.body.generalconferenceSpeaker;
            generalconference.generalconferenceReadLink = req.body.generalconferenceReadLink;
            generalconference.paragraphToJumpToLink = req.body.paragraphToJumpToLink;
            generalconference.keywords = req.body.keywords;
            generalconference.generalconferenceYoutubeLink = req.body.generalconferenceYoutubeLink;
            generalconference.youtubeStartTimeInSec = req.body.youtubeStartTimeInSec;
            generalconference.youtubeEndTimeInSec = req.body.youtubeEndTimeInSec;
            generalconference.generalconferenceMonthYear = req.body.generalconferenceMonthYear;
            generalconference.generalconferenceTalkTitle = req.body.generalconferenceTalkTitle;
            generalconference.generalconferenceSpeakerImageLink = req.body.generalconferenceSpeakerImageLink;
            generalconference.questionsOrTopics = req.body.questionsOrTopics;
            generalconference.notes = req.body.notes;

            Generalconference.updateOne({ id: req.params.id }, generalconference)
                .then(result => {
                    res.status(204).json({
                        message: 'General Conference updated successfully!'
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
                message: "Generalconference not found!",
                error: { generalconference: 'General Conference not found! Error: ' + err }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Generalconference.findOne({ id: req.params.id })
        .then(generalconference => {
            Generalconference.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: 'General Conference deleted successfully!'
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
                message: 'General Conference not found!',
                error: 'General Conference not found! Error: ' + err
            });
        });
});

module.exports = router;