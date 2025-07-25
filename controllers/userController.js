import connectDB from '../db/dbConnection.js'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

const userController = {
    refreshToken: async (req, res) => {
        try {
            const { rf_token } = req.body
            // console.log('Get refreshToken ->', {rf_token})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    // console.log('rf_token' , err.message)
                    return res.status(400).json({ msg: "Invalid or expired refresh token" })
                }

                console.log(decoded)
                const userId = decoded.id

                const newAccessToken = createAccessToken({ id: userId })

                return res.status(200).json({
                    accessToken: newAccessToken,
                    user: { id: userId }
                })
            })

        } catch (error) {
            console.log('Error while getting refreshToken', error.message)
            return res.status(500).json({ msg: "Server error during token refresh" })
        }
    },
    register: async (req, res) => {
        const { email, firstname, lastname, username, password } = req.body
        try {
            await connectDB()
            const user = await User.findOne({ email })
            if (user) {
                console.log('Email Already Registered!')
                return res.status(409).json({ msg: "Email Already Registered" })
            }

            if (password.length < 8) return res.status(400).json({ mgs: "Password should have at least 8 characters" })
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new User({ firstname, lastname, email, username, password: passwordHash })
            await newUser.save()

            const accessToken = createAccessToken({ id: newUser._id })
            const refreshToken = createRefreshToken({ id: newUser._id })


            // res.cookie('refreshToken', refreshToken, {
            //     httpOnly: true,
            //     path: "/user/refresh_token",
            //     maxAge: 7 * 24 * 60 * 60 * 1000,
            //     secure: false,
            //     sameSite: 'lax'
            // })


            return res.json({
                msg: 'Registered Successfully!', accessToken, refreshToken,
                user: {
                    id: newUser._id,
                    firstname,
                    lastname,
                    email
                }
            })

        } catch (error) {
            console.log(error.message)
        }
    },
    login: async (req, res) => {
        const { id, password } = req.body
        try {
            await connectDB()
            const user = await User.findOne({
                $or: [
                    { email: id },
                    { username: id }
                ]
            })
            if (!user) return res.status(400).json({ msg: "User Not Found!" })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(401).json({ msg: "Incorrect Password!" })

            const accessToken = createAccessToken({ id: user._id })
            const refreshToken = createRefreshToken({ id: user._id })

            console.log('login refreshToken ->', refreshToken)

            // res.cookie('refreshToken', refreshToken, {
            //     httpOnly: true,
            //     path: '/user/refresh_token',
            //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            //     secure: false,
            //     sameSite: 'lax'
            // })

            return res.status(200).json({ msg: 'Login Successfully', accessToken, refreshToken })
        } catch (error) {
            console.log('Login Server Error ', error.message)
            res.status(500).json({ msg: "Login Server Error", err: error.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken',
                {
                    path: '/user/refresh_token',
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax'
                })
            return res.status(200).json({ msg: "Log out Successfully!" })
        } catch (error) {
            return res.status(500).json({ msg: "Server Error while loging out" })
        }
    },
    userinfo: async (req, res) => {
        try {
            const { id } = req.body
            await connectDB()
            const user = await User.findById(id).lean()
            return res.status(200).json({ msg: "User Obtained", user })
        } catch (error) {
            return res.status(500).json({ msg: "Server Error while getting user", err: error.message })
        }
    },
    findUser: async (req, res) => {
        try {
            const { id } = req.body
            console.log({id})
            await connectDB()
            const user = await User.findOne({
                $or : [
                    {username : id},
                    {email : id},
                ]
            })
            return res.status(200).json({ msg: "User Obtained", user })
        } catch (error) {
            return res.status(500).json({ msg: "Server Error while getting user", err: error.message })
        }
    }
}

export default userController
