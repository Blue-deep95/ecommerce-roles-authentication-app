const express = require("express")
const bcrypt = require("bcrypt")
const Seller = require("../models/Seller.js")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens.js")
const jwt = require("jwt")

const router = express.Router()
const transporter = require("../utils/sendEmail.js")

router.post("/send-otp", async (req, res) => {
    const { email } = req.body
    try {
        let seller = await Seller.findOne({ email })
        if (!seller) {
            seller = new Seller()
        }

        seller.email = email
        const otp = Math.floor(90000 * Math.random() + 10000)
        seller.otp = otp
        seller.otpExpiry = (5 * 60 * 1000) + Date.now()

        await seller.save()

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP verification Email",
            html: `<h2>Your OTP for email verification is ${otp}<h2>`
        })

        return res.status(201).json({ message: "Check Email OTP sent succesfully...." })
    }
    catch (err) {
        console.log("Server error in send-otp endpoint", err)
        return res.status(500).json({ message: `Internal server error ---> ${err}` })
    }
})

router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body
        const seller = await Seller.findOne({ email })

        if (!seller) {
            return res.status(400).json({ message: "User did not create a OTP" })
        }
        if (seller.otp != otp || Date.now() > seller.otpExpiry) {
            return res.status(500).json({ message: "OTP expired" })
        }
        seller.isEmailVerified = true
        seller.otp = null
        seller.otpExpiry = null
        await seller.save()
        return res.status(200).json({ message: "Email Verified" })
    }
    catch (err) {
        console.log('Error in /verify-otp route', err)
        return res.status(500).json({ message: "Internal server Error while verifiying otp" })
    }
})

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        const seller = await Seller.findOne({ email })

        if (!seller.isEmailVerified) {
            return res.status(400).json({ message: "User Email verification not completed" })
        }

        if (seller.password) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPasssword = await bcrypt.hash(password, 10)
        seller.name = name
        seller.password = hashedPasssword
        await seller.save()
        return res.status(201).json({ message: "Seller registered Succesfully!" })
    }
    catch (err) {
        console.log("Error in /register route", err)
        return res.status(500).json({ messsage: "Internal Server Error while registering user" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        // Find if email exists
        const seller = await Seller.findOne({ email })
        if (!seller) {
            return res.status(400).json({ message: "Invalid Email" })
        }

        // Compare passwords 
        const compare = await bcrypt.compare(password, seller.password)
        if (!compare) {
            return res.status(400).json({ message: "Wrong password" })
        }

        // Crate access and refresh tokens
        const refreshToken = generateRefreshToken(seller._id)
        const accessToken = generateAccessToken(seller._id)

        seller.refreshToken = refreshToken
        await seller.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            path: "/",
            maxAge: (7 * 24 * 60 * 60 * 1000)
        })

        return res.status(200).json({
            accessToken: accessToken,
            user: {
                id: seller._id,
                name: seller.name,
                email: seller.email,
                role: seller.role
            },
            message: "Login succesful!"
        })



    }
    catch (err) {
        console.log("Error in /login route", err)
        return res.status(500).json({ message: "Internal server error" })
    }
})


router.post("/regenerate-access-token", async (req, res) => {
    try {
        // Get the token from cookies
        const refreshToken = req.cookies.refreshToken

        // Use jwt verify to compare it
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
        const seller = Seller.findById(decoded.id)

        if (!seller) {
            return res.status(400).json({ message: "Please login again" })
        }

        const newAccessToken = generateAccessToken(seller._id)

        return res.status(201).json({
            accessToken: newAccessToken,
            message: "Token refreshed succesfully"
        })

    }
    catch (err) {
        console.log("Error in /regenerate-access-token route", err)
        return res.status(500).json({ message: "Internal server Error" })
    }
})

router.post("/logout", async (req, res) => {
    // We have to clear the cookies in the browser 
    // Get the refreshToken in cookies
    const refreshToken = req.cookies.refreshToken

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
    const seller = Seller.findOne({ _id: decode.id })
    seller.refreshToken = null
    await seller.save()
    res.clearCookie("refreshToken")
    return res.status(201).json({ message: "User logged out succesfully" })


})


module.exports = router