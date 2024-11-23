// routes/ticket.js
const express = require('express');
const mongoose = require('mongoose');
const Ticket = require('../models/ticket'); // Assuming you have a Ticket model defined

const router = express.Router();

// Function to generate a unique ticket_id (for demonstration purposes)
const generateTicketId = () => {
    return `TICKET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

// POST /tickets: Create a new ticket
router.post('/', async (req, res) => {
    const { UUID, event_id, user_id } = req.body;

    // Ensure required fields are provided
    if (!UUID || !event_id || !user_id) {
        return res.status(400).json({ message: 'UUID, event_id, and user_id are required' });
    }

    try {
        const newTicket = new Ticket({
            UUID,
            event_id,
            ticket_id: generateTicketId(), // Generate a unique ticket_id
            user_id,
            ticket_status: 'new', // Default status is 'new'
        });

        await newTicket.save();
        res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: 'Error creating ticket', error });
    }
});

// GET /tickets/:id: Get ticket details
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ ticket_id: req.params.id });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({ ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ticket', error });
    }
});

// DELETE /tickets/:id: Delete a ticket
router.delete('/:id', async (req, res) => {
    try {
        const deletedTicket = await Ticket.findOneAndDelete({ ticket_id: req.params.id });

        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket', error });
    }
});

// Export the router
module.exports = router;