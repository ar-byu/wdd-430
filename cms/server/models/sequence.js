const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    _id: {type: Object, required: true},
    maxDocumentId: {type: Number, required: true},
    maxMessageId: {type: Number, required: true},
    maxContactId: {type: Number, required: true}
});

module.exports = mongoose.model('Sequence', sequenceSchema);