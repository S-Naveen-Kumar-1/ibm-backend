const express = require("express")

const userRouter = express.Router()
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model");
const jwt = require('jsonwebtoken');
userRouter.post("/register", async (req, res) => {
    const { email, password, name, avatar } = req.body
    try {

        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(201).send({ "err": "couldnot hash the password" })
            }
            else {
                const user = new UserModel({
                    name,
                    email,
                    password: hash,
                    avatar,
                })
                await user.save()
                res.status(201).send({ "msg": "user registered successfully", "user_details": user })

            }
        });
    }
    catch (err) {
        res.status(400).send({ "error": err.message })

    }
})
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ name: user.name, userID: user._id }, "masai")
                res.status(201).send({ "msg": "user logged in", "token": token, user: user })
            }
            else {
                res.status(201).send({ "err": "wrong credentials" })
            }
        });
    }
    catch (err) {
        res.status(400).send({ "err": err.message })

    }
})

module.exports = { userRouter }