const mongoose = require('mongoose');

const generalConferenceSchema = mongoose.Schema({
    id: { type: String, required: true },
    generalConferenceSpeaker: { type: String, required: true },
    generalConferenceReadLink: { type: String, required: true },
    keywords: { 
        type: [String], 
        required: true,
        validate: [v => v.length > 0, 'At least one keyword is required!'] 
    },
    generalConferenceYouTubeLink: { type: String },
    generalConferenceMonthYear: { type: String },
    generalConferenceTalkTitle: { type: String },
    generalConferenceSpeakerImageLink: { type: String },
    questionOrTopic: { type: [String] },
    note: { type: [String] }
});

module.exports = mongoose.model('GeneralConference', generalConferenceSchema);
