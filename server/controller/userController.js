var bycrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var userModel = require('../model/userModel')

class Controller {
    static createUser ( req, res ) {
        let hash = bycrypt.hash(req.body.password, 5, ( err, hash ) => {
            if (err) {
                res
                .status(500)
                .json(err)
            }else{
                userModel.create({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email
                }, ( err, user ) => {
                    if (err) {
                        res
                        .status(500)
                        .json(err)
                    }else{
                        res
                        .status(201)
                        .json(user)
                    }
                })
            }
        })
    }

    static createAdmin ( req, res ) {
        let hash = bycrypt.hash(req.body.password, 5, ( err, hash ) => {
            if (err) {
                res
                .status(500)
                .json(err)
            }else{
                userModel.create({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    admin: true
                }, ( err, user ) => {
                    if (err) {
                        res
                        .status(500)
                        .json(err)
                    }else{
                        res
                        .status(201)
                        .json(user)
                    }
                })
            }
        })
    }

    static signIn ( req, res ) {
        userModel.findOne({ username: req.body.username }, ( err, user ) => {
            if ( err || user == null) {
                res
                .status(500)
                .json(err)
            }else{
                bycrypt.compare(req.body.password, user.password, ( err, success ) => {
                    if ( err ) {
                        res
                        .status(400)
                        .json(err)
                        console.log('wrong password')
                    } else {
                        jwt.sign({
                            username: user.username,
                            email: user.email,
                            _id: user._id
                        },'secret', ( err, token ) => {
                            if (err) {
                                res
                                .status(500)
                                .json(err)
                                console.log('jwt error')
                            }else{
                                res
                                .status(201)
                                .json({
                                    token,
                                    id: user._id
                                })
                            }
                        })
                    }
                })
            }
        })
    }

}

module.exports = Controller