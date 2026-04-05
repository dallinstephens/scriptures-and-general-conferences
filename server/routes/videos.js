var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Video = require('../models/video');

router.get('/', (req, res, next) => {
    Video.find()
        .then(videos => {
            res.status(200).json({
                message: 'Videos fetched successfully!',
                videos: videos
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
    const maxVideoId = sequenceGenerator.nextId("videos");

    const video = new Video({
        id: maxVideoId,
        videoSpeaker: req.body.videoSpeaker,
        keywords: req.body.keywords,
        videoYoutubeLink: req.body.videoYoutubeLink,
        youtubeStartTimeInSec: req.body.youtubeStartTimeInSec,
        youtubeEndTimeInSec: req.body.youtubeEndTimeInSec,
        videoTitle: req.body.videoTitle,
        videoImageLink: req.body.videoImageLink,        
        questionsOrTopics: req.body.questionsOrTopics,
        notes: req.body.notes
    });
    
    video.save()
        .then(createdVideo => {
            res.status(201).json({
                message: 'Video added successfully!',
                video: createdVideo
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
    Video.findOne({ id: req.params.id })
        .then(video => {
            video.videoSpeaker = req.body.videoSpeaker;
            video.keywords = req.body.keywords;
            video.videoYoutubeLink = req.body.videoYoutubeLink;
            video.youtubeStartTimeInSec = req.body.youtubeStartTimeInSec;
            video.youtubeEndTimeInSec = req.body.youtubeEndTimeInSec;
            video.videoTitle = req.body.videoTitle;
            video.videoImageLink = req.body.videoImageLink;
            video.questionsOrTopics = req.body.questionsOrTopics;
            video.notes = req.body.notes;

            Video.updateOne({ id: req.params.id }, video)
                .then(result => {
                    res.status(204).json({
                        message: 'Video updated successfully!'
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
                message: "Video not found!",
                error: { video: 'Video not found! Error: ' + err }
            });
        });
});

router.delete("/:id", (req, res, next) => {
    Video.findOne({ id: req.params.id })
        .then(video => {
            Video.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(204).json({
                        message: 'Video deleted successfully!'
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
                message: 'Video not found!',
                error: 'Video not found! Error: ' + err
            });
        });
});

module.exports = router;