const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxId: {type: String, required: true}
});

module.exports = mongoose.model('Sequence', sequenceSchema);