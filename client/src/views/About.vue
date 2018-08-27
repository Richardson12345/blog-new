<template>
  <div class="about">
    <br>
    <br>
    <about-component/>
  </div>
</template>

<script>
import AboutComponent from '@/components/AboutComponent.vue'

export default {
  data () {
    return {
      text : 'This is an about page'
    }
  },
  components: {
    AboutComponent
  }
}
</script>

<style scoped>

.about {
  background: #ECE9E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-height: 1000px 
}

</style>
