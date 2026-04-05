var Sequence = require('../models/sequence');

var maxScriptureId;
var maxGeneralConferenceId;
var maxBookId;
var maxVideoId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .exec()
    .then(sequence => {
      sequenceId = sequence._id;
      maxScriptureId = sequence.maxScriptureId;
      maxGeneralConferenceId = sequence.maxGeneralConferenceId;
      maxBookId = sequence.maxBookId;
      maxVideoId = sequence.maxVideoId;
    })
    .catch((err) => {
      console.error('SequenceGenenerator error:', err);
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'scriptures':
      maxScriptureId++;
      updateObject = {maxScriptureId: maxScriptureId};
      nextId = maxScriptureId;
      break;
    case 'generalconferences':
      maxGeneralConferenceId++;
      updateObject = {maxGeneralConferenceId: maxGeneralConferenceId};
      nextId = maxGeneralConferenceId;
      break;
    case 'books':
      maxBookId++;
      updateObject = {maxBookId: maxBookId};
      nextId = maxBookId;
      break;
    case 'videos':
      maxVideoId++;
      updateObject = {maxVideoId: maxVideoId};
      nextId = maxVideoId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
    .catch(err => console.error('nextId error =', err));

  return nextId;
}

module.exports = new SequenceGenerator();