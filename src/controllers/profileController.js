const jwt = require('jsonwebtoken')
require("dotenv").config({ path: 'config.env' });
const secret = process.env.SECRET

const profileModel = require('../models/profileModel')
exports.signup = (req, res) => {
    let reqBody = req.body;
    profileModel.create(reqBody, (error, data) => {
        //console.log(error)
        if (error) {
            res.status(400).json({ status: "Failed", data: error.message })
        } else {
            res.status(201).json({ status: "Successful", data: data })
        }

    })
}

exports.login = async (req, res) => {
    let userName = req.body['userName']
    let passWord = req.body['passWord']

    if (!userName || !passWord) {
        return res.status(401).json({ status: 'Error', Reason: 'Make sure to enter user and password' })
    }

    const user = await profileModel.findOne({ userName });
    //console.log(user)
    if (user == null) {
        return res.status(403).json({ status: 'Error', Reason: 'User not found' })
    } else if (user.passWord != passWord) {

        return res.status(403).json({ status: 'Password error', Reason: 'Password did not match' })
    } else {
        let payload = {
            exp: Math.floor(Date.now() / 1000) + (604800), //7days
            data: user
        }
        //create auth token
        let token = jwt.sign(payload, secret)
        res.status(202).json({ status: "logged in", token: token })
    }

};



exports.profile = (req, res) => {
    let userName = req.headers['userName']
    profileModel.find({ userName: userName }, { _id: 0, passWord: 0 }, { upsert: false }, (error, data) => {
        if (error) {
            res.status(401).json({ status: "Unauthorized", data: error })
        } else {
            res.status(200).json({ status: "Success", data: data })
        }
    }
    )
}

exports.update = (req, res) => {
    let userName = req.headers['userName']
    let reqBody = req.body
    profileModel.updateOne({ userName: userName }, { $set: reqBody }, (error, data) => {
        //console.log(data)
        if (error) {
            res.status(404).json({ status: 'Failed', data: error })
        } else if (data.acknowledged === false) {
            res.status(401).json({ status: 'failed', data: "Only Password modification is allowed" })

        } else if (data.modifiedCount == 0) {
            res.status(401).json({ status: 'failed', data: "You entered your old password" })

        } else if (data.modifiedCount == 1) {
            res.status(201).json({ status: 'Successfull', data: "Password changed successfully" })
        }
        else {
            res.status(200).json({ status: 'updated', data: data })

        }
    })
}