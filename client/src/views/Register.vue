<template>
    <div>
        <div class="row">
           <div class="col col-md-6">
               <div class="picture">
                    <h1>this will be a picture</h1>
               </div>
           </div>
           <div class="col col-md-6">
               <div class="container register" >
                   <h1 class="tokyo">++ REGISTER ++ 手足見音</h1>
                   <br>
                   <form class="border">
                      <div class="form-group">
                        <label for="username">Username</label>
                        <input v-model="username" type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="username">
                      </div> 
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                      </div>
                      <button type="submit" @click.prevent="register(username, email, password)" class="btn btn-outline-primary">Register and login</button>
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
            email: '',
            password: ''
        }
    },
    methods: {
        register ( username, email, password) {
            let self = this
            let userObj = {
                username, 
                email,
                password
            }
            axios.post('http://localhost:3000/users', userObj )
            .then(( result => {
                axios.post('http://localhost:3000/users/signin', userObj)
                .then(( result => {
                    localStorage.setItem('id', result.data.id)
                    localStorage.setItem('token', result.data.token)
                    swal('successfully registered', 'you will now be taken to the homepage', 'success')
                    setTimeout(() => {
                        self.$router.push('/')
                    }, 2000)
                }))
                .catch(( err => {
                    swal('oops', 'something went wrong logging in', 'warning')
                }))
            }))
            .catch(( err => {
                swal('oops', 'something went wrong', 'warning')
            }))
        }
    }
}
</script>

<style scoped>
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
