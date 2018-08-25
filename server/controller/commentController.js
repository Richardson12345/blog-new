var commentModel = require('../model/commentModel');
var jwt = require('jsonwebtoken')

class Controller {
    static createComment ( req,res ) {
        let token = req.headers.token
        jwt.verify(token, 'secret', ( err, decoded ) => {
            if ( err ) {
                res
                .status(401)
                .json(err)
            } else {
                commentModel.create({
                    User: decoded._id,
                    Blog: req.body.blog,
                    content: req.body.content
                }, ( err, comment ) => {
                    if ( err ) {
                        res
                        .status ( 500 )
                        .json ( err ) 
                    }else{
                        res
                        .status ( 201 )
                        .json( comment )
                    }
                })
            }
        })
    }

    static getComment ( req, res ) {
        commentModel.find({ Blog: req.params.blog })
        .populate('User')
        .exec((err, blogs)  => {
            if ( err ) {
                res
                .status(500)
                .json(err)
            } else {
                res
                .status(200)
                .json(blogs)
            }
        })
    }

    static updateComment ( req, res ) {
        commentModel.updateOne({
            _id: req.params.id
        }, {
            content: req.body.content
        }, ( err, changes ) => {
            if ( err ) {
                console.log( 'error on update') 
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

    static deleteComment ( req, res ) {
        let token = req.headers.token
        jwt.verify( token, 'secret', ( err, decoded ) => {
            if ( err ) {
                res
                .status(500)
                .json( err )
            } else {
                commentModel
                .findById(req.params.id)
                .populate('User')
                .exec(( err, data ) => {
                    if ( err ) {
                        res
                        .status(500)
                        .json(err)
                    } else {
                        let user = decoded._id
                        let creator = data.User._id
                        if ( creator == user) {
                            commentModel.deleteOne({
                                _id : req.params.id
                            }, ( err, changes ) => {
                                if ( err ) {
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
}

module.exports = Controller