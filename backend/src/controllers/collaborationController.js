// const liveblocksClient = require('../config/liveblocks.js');
const axios = require('axios');
const env = require('../config/env.js');

// Create room
exports.createRoom = async (req, res) => {
    try {
        console.log("Creating Liveblocks room...");
        
        const { roomId, userId } = req.body;
        
        if (!roomId || !userId) {
            return res.status(400).json({ message: "Room ID and User ID are required." });
        }

        const response = await axios.post("https://api.liveblocks.io/v2/rooms", {
            id: roomId,
            defaultAccesses: ["room:write"],
            usersAccesses: {
                [userId]: ["room:write"]
            }
        }, {
            headers: {
                Authorization: `Bearer ${env.LIVEBLOCKS_SECRET_KEY}`,
                // Authorization: `Bearer sk_prod_Br0jLSyOxVjy_AgCXaEVZawo0Ld_vlWzoj8pbhPyrEh6IWvEyBHPLYEgDVokZzvE`
            }
        });

        console.log("Room created successfully:", response.data);
        res.status(201).json(response.data);

    } catch (error) {
        console.error("Error creating room:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: "Error creating room",
            error: error.response?.data || error.message
        });
    }
};


// Get room
exports.getRoom = async (req, res) => {
    const { roomId } = req.params;

    try {
        const response = await axios.get(`https://api.liveblocks.io/v2/rooms/${roomId}`, {
            headers: { Authorization: `Bearer ${env.LIVEBLOCKS_SECRET_KEY}` },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching room:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: "Error fetching room",
            error: error.response?.data || error.message,
        });
    }
};

// Delete room
exports.deleteRoom = async (req, res) => {
    const { roomId } = req.params;
  
    try {
        await axios.delete(`https://api.liveblocks.io/v2/rooms/${roomId}`, {
            headers: { Authorization: `Bearer ${env.LIVEBLOCKS_SECRET_KEY}` },
        });

        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: "Error deleting room",
            error: error.response?.data || error.message,
        });
    }
};