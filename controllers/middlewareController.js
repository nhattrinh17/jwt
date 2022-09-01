const jwt = require("jsonwebtoken")

const middlewareControler = {
 
    // veriflyToken
    veriflyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
                if (!user) {
                    return res.status(403).json("Token is not valid")
                }
                req.user = user
                next()
            })
        } else {
            return res.status(401).json("You are not authentication")
        }
    },
    veriflyTokenAndAdminAuth: (req, res, next) => {
        middlewareControler.veriflyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.isAdmin) {
                next();
            } else {
                return res.status(403).json("You're not allowed to delete other");
            }
        })
    }
}

module.exports = middlewareControler