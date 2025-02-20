// const liveblocksClient = require('../config/liveblocks.js');
const axios = require('axios');
const env = require('../config/env.js');
const Room = require("../models/Room");
const User = require("../models/User");

// Create room
exports.createRoom = async (req, res) => {
    try {
        console.log("Creating Liveblocks room...");

        const { userId, roomName } = req.body; 
        if (!roomName || !userId) {
            return res.status(400).json({ message: "Room name and User ID are required." });
        }
        const response = await axios.post(
            "https://api.liveblocks.io/v2/rooms",
            {
                id: `${userId}-${Date.now()}`,
                defaultAccesses: ["room:write"],
                usersAccesses: { [userId]: ["room:write"] },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}`,
                },
            }
        );// Unique room ID
        console.log("Room created successfully:", response.data);
        
        const roomId = `${userId}-${Date.now()}`; 
        const newRoom = new Room({
            name: roomName,
            owner: userId,
        });
        await newRoom.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.rooms.push(newRoom._id);
        await user.save();

        res.status(201).json({
            message: "Room created successfully",
            liveblocksRoom: response.data,
            room: newRoom,
        });

    } catch (error) {
        console.error("Error creating room:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: "Error creating room",
            error: error.response?.data || error.message,
        });
    }
};


// Get room
exports.getRoom = async (req, res) => {
    try {
            const { userId } = req.params;
    
            if (!userId) {
                return res.status(400).json({ message: "User ID is required." });
            }
    
            // Find the user and populate the rooms field
            const user = await User.findById(userId).populate("rooms");
    
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
    
            res.status(200).json({ rooms: user.rooms });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
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