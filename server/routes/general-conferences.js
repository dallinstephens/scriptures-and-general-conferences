var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const GeneralConference = require('../models/general-conference');

router.get('/', (req, res, next) => {
    GeneralConference.find()
        .then(generalConferences => {
            res.status(200).json({
                message: 'General Conferences fetched successfully!',
                generalConferences: generalConferences
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
    const maxGeneralConferenceId = sequenceGenerator.nextId("generalConferences");

    const generalConference = new GeneralConference({
        id: maxGeneralConferenceId,
        generalConferenceSpeaker: req.body.generalConferenceSpeaker,
        generalConferenceReadLink: req.body.generalConferenceReadLink,
        keywords: req.body.keywords,
        generalConferenceYouTubeLink: req.body.generalConferenceYouTubeLink,
        generalConferenceMonthYear: req.body.generalConferenceMonthYear,
        generalConferenceTalkTitle: req.body.generalConferenceTalkTitle,
        generalConferenceSpeakerImageLink: req.body.generalConferenceSpeakerImageLink,        
        questionOrTopic: req.body.questionOrTopic,
        note: req.body.note
    });
    
    generalConference.save()
        .then(createdGeneralConference => {
            res.status(201).json({
                message: 'General Conference added successfully!',
                generalConference: createdGeneralConference
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
    GeneralConference.findOne({ id: req.params.id })
        .then(generalConference => {
            generalConference.generalConferenceSpeaker = req.body.generalConferenceSpeaker;
            generalConference.generalConferenceReadLink = req.body.generalConferenceReadLink;
            generalConference.keywords = req.body.keywords;
            generalConference.generalConferenceYouTubeLink = req.body.generalConferenceYouTubeLink;
            generalConference.generalConferenceMonthYear = req.body.generalConferenceMonthYear;
            generalConference.generalConferenceTalkTitle = req.body.generalConferenceTalkTitle;
            generalConference.generalConferenceSpeakerImageLink = req.body.generalConferenceSpeakerImageLink;
            generalConference.questionOrTopic = req.body.questionOrTopic;
            generalConference.note = req.body.note;

            GeneralConference.updateOne({ id: req.params.id }, generalConference)
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
                message: "GeneralConference not found!",
                error: { generalConference: 'General Conference not found! Error: ' + err }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    GeneralConference.findOne({ id: req.params.id })
        .then(generalConference => {
            GeneralConference.deleteOne({ id: req.params.id })
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