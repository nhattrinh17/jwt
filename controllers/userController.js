const User = require("../models/User")

const UserController = {
    getAllUser: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if(user) {
                res.status(200).send("Delete successfully")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = UserController