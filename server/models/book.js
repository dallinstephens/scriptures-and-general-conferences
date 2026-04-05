const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    id: { type: String, required: true },
    bookName: { type: String, required: true },
    bookLink: { type: String, required: true },
    keywords: { 
        type: [String], 
        required: true,
        validate: [v => v.length > 0, 'At least one keyword is required!'] 
    },
    bookImageLink: { type: String },
    questionsOrTopics: { type: [String] },
    notes: { type: [String] },
    attribution: { type: String, default: 'Source: ChurchOfJesusChrist.org'}    
});

module.exports = mongoose.model('Book', bookSchema);
