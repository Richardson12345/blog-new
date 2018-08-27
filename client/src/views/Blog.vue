<template>
  <SingleBlog :blog="this.blog" :commentArr="this.commentArr" :param="this.idParam"  @comment="getComment"/>
</template>

<script>
import SingleBlog from '@/components/singleBlog.vue'

export default {
    data () {
        return {
            idParam: this.$route.params.id,
            blog: '',
            comment:'',
            commentArr: []
        }
    },
    methods: {
        submitComment ( comment ) {
            let blog = this.$route.params.id
            let user = localStorage.getItem('user')
            let self = this
            let commentObj = {
                blog,
                user,
                content: comment
            }
            axios.post('http://localhost:3000/comment/', commentObj)
            .then((result => {
                swal('success', 'succesfully posted comment', 'success')
                self.getComment()
            }))
            .catch((err => {
                swal('ooops', 'something went wrong', 'warning')
            }))
        },
        getBlog () {
            axios.get(`http://localhost:3000/blog/one/${this.$route.params.id}`)
            .then((result => {
                this.blog = result.data
                console.log(this.blog)
            }))
            .catch((err => {
                console.log(err)
            }))
        },
        getComment () {
            axios.get(`http://localhost:3000/comment/${this.$route.params.id}`)
            .then((result => {
                this.commentArr = result.data
                console.log(this.commentArr)
            }))
            .catch((err => {
                console.log(err)
            }))
        }
    },
    components: {
        SingleBlog
    },
    mounted () {
        this.idParam = this.$route.params.id
        this.getBlog()
        this.getComment()
    },
    watch: {
        '$route' (to, from) {
            console.log('asdads')
            this.idParam = this.$route.params.id
            this.getBlog()
            this.getComment()
      // react to route changes...
        }
    }
}
</script>

<style scoped>

.img-fluid {
    width: 100%;
}
</style>