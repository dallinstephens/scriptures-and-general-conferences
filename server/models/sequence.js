const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxScriptureId: { type: Number },
    maxGeneralConferenceId: { type: Number },
    maxBookId: { type: Number },
    maxVideoId: { type: Number }
});

module.exports = mongoose.model('Sequence', sequenceSchema);