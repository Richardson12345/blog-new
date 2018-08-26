var chai = require('chai')
 , chaiHttp = require('chai-http')
chai.use(chaiHttp)
expect = chai.expect
assert = chai.assert
var urlUser = "http://localhost:3000/users"
var urlBlog = "http://localhost:3000/blog"
var urlComment = "http://localhost:3000/comment"
var mongoose = require('mongoose')
var userModel = require('../model/userModel')
let blogId = ''
let commentId = ''
let token = ''

describe("User", function(){
    // beforeEach('Setting up the userList', function(done){
    //     mongoose.connect("mongodb://admin:abc123@ds245971.mlab.com:45971/article-blog-test", { useNewUrlParser: true })
    //     var db = mongoose.connection;
    //     db.on('error', console.error.bind(console, 'connection error:'));
    //     db.once('open', function() {
    //       console.log('connected to testing');
    //       done()
    //       // we're connected!
    //     });
    // });

    it("should create a new user" , function(done){
         chai.request(urlUser)
         .post('/')
         .send({
             username  : "harry potter",
             email : "harry@mail.com",
             password : "doog123"
         })
         .end(function(err,res){
             expect(res).to.not.equal(undefined)
             expect(res.error).to.equal(false);
             expect(res.status).to.equal(201);
             expect(res.body.username).to.equal("harry potter");
             done()
         })
    })

    it("signin" , function(done){
        chai.request(urlUser)
        .post('/signin')
        .send({
            username  : "harry potter",
            email : "harry@mail.com",
            password : "doog123"
        })
        .end(function(err,res){
            token = res.body.token
            expect(res).to.not.equal(undefined)
            expect(res.error).to.equal(false)
            expect(res.status).to.equal(201)
            expect(res.body.token).to.not.equal(undefined)
            expect(res.body.token).to.not.equal(null)
            expect(res.body.id).to.not.equal(undefined)
            expect(res.body.id).to.not.equal(null)
            done()
        })
   })
})

describe("Blog", function () {
    it ('should create a new blog', function (done) {
        chai.request(urlBlog)
        .post('/')
        .set('token', token)
        .send({
            imgUrl  : "https://urbanouteaters.com/wp-content/uploads/2018/08/Garden7a-800x531.jpg",
            title : "testing tdd",
            content : "what is a not lorem"
        })
        .end(function(err,res){
            blogId = res.body._id
            expect(res).to.not.equal(undefined)
            expect(res.error).to.equal(false)
            expect(res.status).to.equal(201)
            expect(res.body.content).to.equal("what is a not lorem")
            expect(res.body.title).to.equal('testing tdd')
            expect(res.body.imgUrl).to.equal('https://urbanouteaters.com/wp-content/uploads/2018/08/Garden7a-800x531.jpg')
            done()
        })
    })

    it ('get all blogs', function (done) {
        chai.request(urlBlog)
        .get('/')
        .end(function(err,res){
            expect(res).to.not.equal(undefined)
            expect(res.error).to.equal(false)
            expect(res.status).to.equal(200)
            assert.isAtLeast(res.body.length, 1, 'blog is not empty')
            // expect(res.body.length).assert.isAbove(0)
            done()
        })
    })

    it('should update a SINGLE Blog', function(done){
        chai.request(urlBlog)
        .put(`/${blogId}`)
        .set('token', token)
        .send({
            imgUrl  : "https://urbanouteaters.com/wp-content/uploads/2018/08/Garden7a-800x531.jpg",
            title : "testing tdd",
            content : "what is a yes lorem"
        })
        .end(function(err, res){
            expect(res.status).to.equal(201)
            expect(res.body.n).to.equal(1)
            done()
        })
    })

    it('should delete a SINGLE Blog', function(done){
        chai.request(urlBlog)
        .delete(`/${blogId}`)
        .set('token', token)
        .end(function(err, res){
            expect(res.status).to.equal(201)
            expect(res.body.title).to.equal('testing tdd')
            expect(res.body.content).to.equal("what is a yes lorem")
            expect(res.body.imgUrl).to.equal('https://urbanouteaters.com/wp-content/uploads/2018/08/Garden7a-800x531.jpg')
            done()
        })
    })
})

describe('Comment', function () {
    it('should post COMMENT on a Blog', function(done){
        chai.request(urlComment)
        .post(`/`)
        .set('token', token)
        .send({
            content: 'testing',
            blog: blogId
        })
        .end(function(err, res){
            commentId = res.body._id
            // console.log(commentId)
            expect(res.status).to.equal(201)
            expect(res.body.content).to.equal("testing")
            done()
        })
    })

    it('should get COMMENTS on a Blog', function(done){
        chai.request(urlComment)
        .get(`/${blogId}`)
        .end(function(err, res){
            expect(res.status).to.equal(200)
            assert.isAtLeast(res.body.length, 1, 'blog is not empty')
            done()
        })
    })

    it('should delete a single COMMENTS based on ID', function(done){
        chai.request(urlComment)
        .delete(`/${commentId}`)
        .set('token', token)
        .end(function(err, res){
            expect(res.status).to.equal(201)
            expect(res.body.n).to.equal(1)
            done()
        })
    })
})