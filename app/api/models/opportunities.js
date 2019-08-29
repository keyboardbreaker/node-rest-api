const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const OpportunitySchema = new Schema({
    name: {
        type: String,
        trim: true,  
        required: true,
    },
    status: {
        type: Date,
        trim: true,
        required: true
    }
});
module.exports = mongoose.model('Opportunity', OpportunitySchema)