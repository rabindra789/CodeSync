require("dotenv").config()
const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")

const app = express()
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

app.set("view engine", "ejs")

app.use(expressLayouts);
app.set("layout", "layouts/main"); 

app.use(express.static("public"))

const mainRoutes = require("./routes/index.js")
app.use("/", mainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})