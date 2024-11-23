// models/user.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    UUID: { type: String, required: true, unique: true },
    event_id: { type: String, required: true, unique: true },
    ticket_id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true, unique: true },
    ticket_status: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Ticket ', ticketSchema);