const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require("../models/User");

let refreshTokens = []
const authController = {
    // REGISTER
    reristerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt)

            // Create new User
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })

            //Save to DB
            const user = await newUser.save();
            res.status(200).send(user); 
        } catch (error) {
            res.json(error)
        }
    },

    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: "20s"
            }
        )
    },

    // GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: "365d"
            }
        )
    },
    // LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username})
            if (!user) {
                return res.status(404).send("User does not exist!")
            }
            const validPasword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPasword) {
                return res.status(404).send("Wrong password")
            }
            if (user && validPasword) {
                const {password, ...other} = user._doc
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })
                res.status(200).json({...other, accessToken})
            }
            
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    // RefreshToken
    requestRefreshToken: async (req, res) => {
        //Take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        //Send error if token is not valid
        if (!refreshToken) return res.status(401).json("You're not authenticated");
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //create new access token, refresh token and send to user
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure:false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
      },

    // Log out
    userLogout: async (req, res) => {
        res.clearCookie('refreshToken')
        refreshTokens = refreshTokens.filter(token => token != req.cookies.refreshToken)
        res.status(200).json("Logged user!")
    }
}

module.exports = authController
