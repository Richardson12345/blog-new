var blogModel = require('../model/blogModel')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')

class Controller {
    static addBlog ( req,res ) {
        let token = req.headers.token
        jwt.verify(token, 'secret', ( err, decoded ) => {
            if ( err ) {
                res
                .status(401)
                .json(err)
            } else {
                blogModel.create({
                    imgUrl: req.body.imgUrl,
                    user: decoded._id,
                    title: req.body.title,
                    content: req.body.content
                }, ( err, blog ) => {
                    if ( err ) {
                        console.log(err)
                        res
                        .status(401)
                        .send(err)
                    }else{
                        res
                        .status(201)
                        .json(blog)
                    }
                })   
            }
        })
    }

    static readOne ( req, res ) {
        blogModel.findById(req.params.id)
        .populate('user')
        .exec(( err, data ) => {
            if (err) {
                res
                .status(500)
                .json(err)
            }else {
                res
                .status(200)
                .json(data)
            }
        })
    }

    static readBlog ( req, res ){
        blogModel.find({})
        .sort({updatedAt: 'desc'})
        .populate('user')
        .exec(( err, data ) => {
            if (err) {
                res
                .status(500)
                .json(err)
            }else {
                res
                .status(200)
                .json(data)
            }
        })
    }

    static deleteBlog ( req, res ) {
        let token = req.headers.token
        jwt.verify(token, 'secret', ( err , decoded ) => {
            if ( err ) {
                res
                .status(401)
                .json(err)
            } else {
                let user = decoded._id
                blogModel
                .findById(req.params.id)
                .populate('user')
                .exec(( err, data ) => {
                    if (err) {
                        res
                        .status(404)
                        .json(err)
                    } else {
                        let creator = data.user._id
                        if ( creator == user ) {
                            blogModel
                            .findByIdAndRemove(req.params.id , ( err, changes ) => {
                                if ( err || changes.n == 0 ) {
                                    res
                                    .status(500)
                                    .json(err)
                                } else {
                                    res
                                    .status(201)
                                    .json(changes)
                                }
                            })
                        }
                    }
                })
            }
        })
    }

    static updateBlog ( req, res ) {  
        let token = req.headers.token
        jwt.verify( token, 'secret', ( err, decoded ) => {
            if (err) {
                res
                .status(401)
                .json(err)
            } else {
                let user = decoded._id
                blogModel.findById(req.params.id)
                .populate('user')
                .exec((err, data) => {
                    if ( err ) {
                        res
                        .status(500)
                        .json(err)
                    } else {
                        let creator = data.user._id
                        if ( creator == user ) {
                            blogModel.updateOne({ _id: req.params.id }, {
                                title: req.body.title,
                                imgUrl: req.body.imgUrl,
                                content: req.body.content
                            }, ( err, changes ) => {
                                if (err) {
                                    console.log(err)
                                    res
                                    .status(500)
                                    .json(err)
                                }else{
                                    res
                                    .status(201)
                                    .json(changes)
                                }
                            })
                        }
                    }
                })
            }
        })
    }

    static uploadImage ( req, res ) {
            res
            .status(200)
            .json({
                message: "succesfully posted to bucket",
                link: req.file.cloudStoragePublicUrl
            })
    }
}

module.exports = Controller