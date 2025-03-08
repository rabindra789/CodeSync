const express = require("express");
const router = express.Router();
const axios = require("axios");

// Home Route
router.get("/", (req, res) => {
    res.render("pages/index", { title: "CodeSync - Home" });
});

router.get("/signup", (req, res) => {
    res.render("pages/signup", { title: "CodeSync - Signup" });
});

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/signup",
            {
                username,
                email,
                password,
            }
        );

        if (response.status === 201) {
            return res.redirect("/login");
        }
    } catch (error) {
        const message = error.response?.data?.error || "Signup failed!";
        return res.render("pages/signup", { message });
    }
});

router.get("/login", (req, res) => {
    res.render("pages/login", { title: "CodeSync - SignIn" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );

        const data = response.data;
        res.cookie("token", response.headers["set-cookie"]);
        if (response.status === 200) {
            const user = data.user;
            const userId = data.userId;
            return res.redirect(`/dashboard/${userId}`);
        } else {
            return res
                .status(400)
                .render("pages/login", {
                    message: data.message || "Login failed.",
                });
        }
    } catch (error) {
        const message = error.response?.data?.error || "Login failed!";
        return res.render("pages/login", { message });
    }
});

router.get("/logout", async (req, res) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/api/auth/logout"
        );
        if (response.status === 200) {
            return res.redirect("/");
        }
    } catch (error) {
        return res.redirect("/dashboard");
    }
});

router.get("/dashboard/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const response = await axios.get(
            `http://localhost:5000/api/collaborations/${userId}`,{
                withCredentials: true,  
            }
        );
        console.log("Response:", response.data);
        res.render("pages/dashboard", {
            title: "CodeSync - Dashboard",
            rooms: response.data.rooms || [],
            dashboard: true,
            userId
        });
    } catch (error) {
        console.error("Error fetching dashboard:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/create-room", async (req, res) => {
    const { roomName, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "Room name and User ID are required." });
    }

    try {
        const response = await axios.post("http://localhost:5000/api/collaborations/create", {
            roomName,
            userId,
        });

        console.log("Room created successfully:", response.data.room);

        const newRoom = response.data.room;
        return res.redirect(`/dashboard/${userId}`);
    } catch (error) {
        console.error("Error creating room:", error.response?.data || error.message);
        return res.status(error.response?.status || 500).json({
            message: "Error creating room",
            error: error.response?.data || error.message,
        });
    }
});

router.get("/room/:roomId", async (req, res) => {
    const { roomId } = req.params;
    res.render("pages/room", { title: "CodeSync - Room", roomId });
})

module.exports = router;
