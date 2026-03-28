const mongoose = require('mongoose');

const scriptureSchema = mongoose.Schema({
    id: { type: String, required: true },
    scripturePassage: { type: String, required: true },
    scriptureLink: { type: String, required: true },
    keywords: { 
        type: [String], 
        required: true,
        validate: [v => v.length > 0, 'At least one keyword is required!'] 
    },
    scriptureImageLink: { type: String },
    questionOrTopic: { type: [String] },
    note: { type: [String] },
    attribution: { type: String, default: 'Source: ChurchOfJesusChrist.org'}    
});

module.exports = mongoose.model('Scripture', scriptureSchema);
