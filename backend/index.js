const express = require("express")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db.js")
const sellerRoutes = require("./routes/sellerRoutes.js")


const app = express()
const PORT = 2000

// middleware 
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// Connect DB by calling the async function
connectDB()

//Routes
app.get("/", (req, res) => {
    return res.json("server running")
})

app.use("/api/seller", sellerRoutes)


app.listen(PORT, () => console.log("Server running on port", PORT))