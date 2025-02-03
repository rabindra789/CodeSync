const express = require('express');
const { createRoom, getRoom, deleteRoom } = require('../controllers/collaborationController.js');

const router = express.Router();

router.post('/create', createRoom);
router.get('/:roomId', getRoom)
router.delete('/:roomId', deleteRoom)

export default router;