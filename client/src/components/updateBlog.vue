<template>
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
       <button class="btn btn-outline-info" @click.prevent="update">update blog</button>
      </div>
    </form>  
</template>

<script>
export default {
    data () {
        return {
            title: '',
            content: '',
            imgUrl: ''
        }
    },
    methods: {
        update () {
            let self = this
            axios.post('http://localhost:3000/blog/multer', this.imgUrl)
            .then((result => {
                let link = result.data.link
                let blogObj = {
                    imgUrl: link,
                    title: this.title,
                    content: this.content
                }
                axios.put(`http://localhost:3000/blog/${this.$route.params.id}`, blogObj, { headers: { token: localStorage.getItem('token') } })
                .then((result => {
                    console.log(result.data)
                    swal('success', 'succesfully updated blog', 'success')
                    this.$router.push('/')
                }))
                .catch((err => {
                    console.log(err)
                    swal('ooops', 'something went terribly wrong', 'warning')
                }))
            }))
            .catch((err => {
                console.log('err multer', err)
                swal('oops', 'please choose an iamge to upload as the thumbnail', 'warning')
            }))
        },
        upload (e) {
            let form = new FormData()
            form.append('image', e.target.files[0])
            this.imgUrl = form
        }
    },
    mounted () {
        axios.get(`http://localhost:3000/blog/one/${this.$route.params.id}`)
        .then((result => {
            let { title, content } = result.data
            this.title = title
            this.content = content
        }))
        .catch((err => {
            console.log(err)
        }))
    }
}
</script>

<style>

</style>
