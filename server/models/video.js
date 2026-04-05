const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    id: { type: String, required: true },
    videoTitle: { type: String, required: true },
    keywords: { 
        type: [String], 
        required: true,
        validate: [v => v.length > 0, 'At least one keyword is required!'] 
    },
    videoYoutubeLink: { type: String },
    youtubeStartTimeInSec: { type: String },
    youtubeEndTimeInSec: { type: String },
    videoSpeaker: { type: String },
    videoImageLink: { type: String },
    questionsOrTopics: { type: [String] },
    notes: { type: [String] },
    attribution: { type: String, default: 'Source: ChurchOfJesusChrist.org'} 
});

module.exports = mongoose.model('Video', videoSchema);
