const mongoose = require('mongoose')
const listSchema = mongoose.Schema({
    userName: { type: String },
    subject: {
        type: String,
        default: "todo " + Date.now()
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'incomplete', 'completed'],
        default: "new"
    },
    creationDate: { type: Date },
    updateDate: { type: Date }
}, { versionKey: false })

const listModel = mongoose.model('lists', listSchema);
module.exports = listModel