var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

router.get('/', (res, req, next) => {
    Message
        .find()
        .then((error, data) => {
        console.log(data);
        if (error) {
            return res.status(500).json({
                message: 'An error has occured while fetching messages: ',
                error: error
            });
        } else {
            res.status(200).json(data);
        };
    });
});

router.post('/', (res, req, next) => {
    const maxMessageId = sequenceGenerator.nextId('messages');
    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    });
    message
        .save()
        .then(createdMessage => {
            res.status(201).json({
                message: "Message added successfully.",
                message: createdMessage
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error occured while adding the message: ",
                error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({id: req.params.id})
        .then(message => {
            message.name = req.body.name,
            message.description = req.body.description,
            message.url = req.body.url

            Message.updateOne({id: req.params.id}, message)
                .then(result => {
                    res.status(204).json({
                        message: "Message updated successfully."
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: "An error occured while updating the message: ",
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "Message not found",
                error: {message: 'Message not found'}
            });
        });

});

router.delete('/:id', (req, res, next) => {
    Message
        .findOne({id: req.params.id})
        .then(message => {
            Message.deleteOne({id: req.params.id})
            .then(result => {
                res.status(204).json({
                message: "Message deleted successfully"
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'An error occured while deleting the message: ',
                    error: error
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Message not found',
                error: {message: 'Message not found'}
            });
        });
});

module.exports = router;