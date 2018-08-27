<template>
  <div class="home">
    <br>
    <br>
    <HelloWorld msg="Wellcome to my blog page"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    NavBar
  },
  mounted () {
    axios.get('http://localhost:3000/blog')
    .then((result => {
      let array = result.data
      let latest = array[0]._id
      this.$router.push(`/${latest}/blog`)

    }))
    .catch((err => {
      console.log(err)
    }))
  }
}
</script>

<style scoped>
 
</style>

