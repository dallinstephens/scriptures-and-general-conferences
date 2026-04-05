const mongoose = require('mongoose');

const generalconferenceSchema = mongoose.Schema({
    id: { type: String, required: true },
    generalconferenceSpeaker: { type: String, required: true },
    generalconferenceReadLink: { type: String, required: true },
    paragraphToJumpToLink: { type: String, required: true },
    keywords: { 
        type: [String], 
        required: true,
        validate: [v => v.length > 0, 'At least one keyword is required!'] 
    },
    generalconferenceYoutubeLink: { type: String },
    youtubeStartTimeInSec: { type: String },
    youtubeEndTimeInSec: { type: String },
    generalconferenceMonthYear: { type: String },
    generalconferenceTalkTitle: { type: String },
    generalconferenceSpeakerImageLink: { type: String },
    questionsOrTopics: { type: [String] },
    notes: { type: [String] },
    attribution: { type: String, default: 'Source: ChurchOfJesusChrist.org'} 
});

module.exports = mongoose.model('GeneralConference', generalconferenceSchema);
