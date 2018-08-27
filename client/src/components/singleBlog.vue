<template>
  <div class="blog">
    <h1 class="mt-4">{{blog.title}}</h1>
    <!-- Author -->
    <p class="lead">
      by
      <span style="color: blue;">{{blog.user.username}}</span>
    </p>
    <hr>
    <p>Posted on: {{blog.createdAt}} - Updated at: {{blog.updatedAt}}</p>
    <hr>
    <!-- thumbnail picture -->
    <img class="img-fluid rounded" :src="blog.imgUrl" alt="">
    <hr>
    <!-- content -->
    <div>
      <div v-html="blog.content"></div>
    </div>

    <hr>
    <!-- create comment -->
    <div class="card my-4">
      <h5 class="card-header">Leave a Comment:</h5>
      <div class="card-body">
          <strong>Your comment:</strong>
          <br/>
        <form>
          <div class="form-group">
            <textarea v-model="comment" class="form-control" rows="3"></textarea>
          </div>
          <button type="submit" @click.prevent="submitComment(comment)"  class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <hr>
    <!-- comment section -->
    <div class="media mb-4" v-for="( comment, index ) in commentArr" v-bind:key="index">
      <img class="d-flex mr-3 rounded-circle mini" src="http://3.bp.blogspot.com/-CrGkU8X7yZY/U5d2BTp-hYI/AAAAAAAAIl8/ccmJHioTFT0/s1600/anonymous-emoticon.png" alt="">
      <div class="media-body">
        <div class="card">
          <div class="card-header">
            {{ comment.User.username }} commented: 
            <span 
            v-if="user == comment.User._id" class="tilt"
            >
            <i @click="deleteComment(comment._id)" class="fas fa-trash-alt"></i>
            </span>
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{comment.content}}</p>
              <footer class="blockquote-footer"> created at: {{comment.createdAt}} &nbsp; updated at: {{comment.updatedAt}}</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: [
        'commentArr',
        'blog',
        'param'
    ],
    data () {
        return {
            idParam: this.param,
            comment:'',
            user: localStorage.getItem('id')
        }
    },
    methods: {
        submitComment ( comment ) {
            let blog = this.param
            let user = localStorage.getItem('user')
            let self = this
            let commentObj = {
                blog,
                user,
                content: comment
            }
            axios.post('http://localhost:3000/comment/', commentObj, { headers: { token: localStorage.getItem('token') }})
            .then((result => {
                swal('success', 'succesfully posted comment', 'success')
                self.$emit('comment')
                this.comment = ''
            }))
            .catch((err => {
                swal('ooops', 'something went wrong', 'warning')
            }))
        },
        deleteComment ( id ) {
            let self = this
            axios.delete(`http://localhost:3000/comment/${id}`, { headers: { token: localStorage.getItem('token') } })
            .then((result => {
                swal('succesfully deleted', 'your comment has been succesfully delelted', 'success')
                self.$emit('comment')
            }))
            .catch((err => {
                swal('oops', 'something went wrong on the deletion of your comment', 'warning')
            }))
        }
    }
}
</script>

<style scoped>
.tilt {
    float: right;
}

.img-fluid {
    width: 100%;
}

.mini {
    height: 50px;
    width: 50px;
}
</style>