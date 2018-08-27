<template>
   <div class="container">
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Blog title</label>
            <input type="text" v-model="title" class="form-control" id="exampleFormControlInput1" placeholder="blo title">
          </div>
          <div class="form-group">
            <label for="exampleFormControlFile1">Blog Thumbnail</label>
            <input type="file" @change="upload($event)" class="form-control-file" id="exampleFormControlFile1">
          </div>
          <div class="form-group">
           <label for="inputcontent">Blog Content</label>
           <wysiwyg v-model="content" id="inputcontent"/>
          </div>
          <div class="form-group">
           <button class="btn btn-outline-info" @click.prevent="submitBlog">post blog</button>
          </div>
        </form> 
   </div>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            imgUrl: '',
            content: ''
        }
    },
    methods: {
        upload (e) {
            let form = new FormData()
            form.append('image', e.target.files[0])
            this.imgUrl = form
        },
        submitBlog () {
            let self = this
            axios.post('http://localhost:3000/blog/multer', this.imgUrl)
            .then((result => {
                let link = result.data.link
                let blogObj = {
                    imgUrl: link,
                    title: this.title,
                    content: this.content
                }
                axios.post('http://localhost:3000/blog', blogObj, { headers: { token: localStorage.getItem('token') } })
                .then((result => {
                    console.log(result.data)
                    swal('success', 'succesfully posted blog', 'success')
                    this.$router.push('/')
                }))
                .catch((err => {
                    console.log(err)
                    swal('ooops', 'something went terribly wrong', 'warning')
                }))
            }))
            .catch((err => {
                console.log('err multer', err)
            }))

        }
    }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.container {
    margin: 0 auto;
}

</style>
