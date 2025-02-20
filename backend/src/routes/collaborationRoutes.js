const express = require('express');
const { createRoom, getRoom, deleteRoom } = require('../controllers/collaborationController.js');

const router = express.Router();

router.post('/create', createRoom);
router.get('/:userId', getRoom)
router.delete('/:roomId', deleteRoom)

module.exports = router;