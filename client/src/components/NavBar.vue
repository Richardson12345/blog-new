<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top tokyo">
      <div class="container">
        <a class="navbar-brand" href="/">++ FOOD BLOG  弱強高同親母父 ++ </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item active">
             <a class="nav-link" href="/add">Post-Blog
             </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </li>
            <li class="nav-item active">
              <a @click="logout" class="nav-link" v-if="logged">logout</a>
              <a @click="login" class="nav-link" v-else>login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
 export default {
     name: 'Navbar',
     data () {
         return {
           logged: localStorage.getItem('token')
         }
     },
     methods: {
       logout () {
         localStorage.clear()
        //  this.logged = false
         this.$router.push('/login')
       },
       login () {
         this.$router.push('/login')
       } 
     },
     watch: {
       '$route' (to, from) {
            this.logged = localStorage.getItem('token')
      // react to route changes...
        }
     }
 }

</script>

<style scoped>
.tokyo {
    font-family: 'Kosugi Maru', sans-serif;
}


</style>

