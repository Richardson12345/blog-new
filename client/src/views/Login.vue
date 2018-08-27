<template>
    <div>
        <div class="row">
           <div class="col col-md-6">
               <div class="picture">
               </div>
           </div>
           <div class="col col-md-6">
               <div class="container register" >
                   <h1 class="tokyo">++ LOGIN ++ 手足見音</h1>
                   <br>
                   <form class="border">
                      <div class="form-group">
                        <label for="username">Username</label>
                        <input v-model="username" type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="username">
                      </div> 
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                      </div>
                      <button type="submit" @click.prevent="login( username, password)" class="btn btn-outline-primary">Login</button><span class="tokyo banzai"> dont have an acount? <router-link to="/register">register</router-link></span>
                    </form>
               </div>
           </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login ( username, password) {
            let self = this
            let userObj = {
                username, 
                password
            }
            axios.post('http://localhost:3000/users/signIn', userObj)
            .then((result => {
                localStorage.setItem('id', result.data.id)
                localStorage.setItem('token', result.data.token)
                self.$router.push('/')
            }))
            .catch((err => {
                swal('oops', 'username or password did not match', 'info')
            }))
        }
    }
}
</script>

<style scoped>
.banzai {
    font-size: 18px;
    color: grey;
}

.tokyo {
    font-family: 'Kosugi Maru', sans-serif;
}

.container {
    width: 700px;
}

.register {
    margin-top: 250px;
}
.border {
    padding: 20px;
}
.picture {
    height: 1000px;
    background: #2980B9;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #FFFFFF, #6DD5FA, #2980B9);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #FFFFFF, #6DD5FA, #2980B9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

</style>
