const liveblocksClient = require('../config/liveblocks.js');


// Create room
export const createRoom = async (req, res) => {
    const { roomId, userId } = req.body;

    try {
        await liveblocksClient.createRoom(roomId, {
            user: [{ id: userId }],
        });
        res.status(201).json({message: 'Room created successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error creating room', error})
    }
};

// Get room
export const getRoom = async (req, res) => {
    const { roomId } = req.params;

    try {
        const room = await liveblocksClient.rooms.get(roomId);
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json({message: 'Error fetching room', error})
    }
};

// Delete room
export const deleteRoom = async (req, res) => {
    const { roomId } = req.params;
  
    try {
      await liveblocks.rooms.delete(roomId);
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting room', error });
    }
};