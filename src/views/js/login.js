import FormInput from '../../components/FormInput.vue'
import Button from '../../components/Button.vue'
import { useCurrentUserStore } from '../../stores/authenticated-user.js'
import { mapActions, mapState } from 'pinia'

export default {
    name: "Login",
    components: {
        FormInput,
        Button
    },
    data () {
        return {
            username: "",
            password: "",
            error: ""
        }
    },
    methods: {
        ...mapActions(useCurrentUserStore, ['getCurrentUser', 'setCurrentUser']),
        login() {
            if (this.username.length === 0) {
                this.error = "Username must be filled"
                return
            } else if (this.password.length === 0) {
                this.error = "Password must be filled"
                return
            }

            fetch(`http://localhost:8081/backend/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username: this.username,
                    password: this.password
                })
            })
            .then((res) => res.json())
            .then(body => {
                if (body.code !== 200) {
                    this.error = body.message
                } else {
                    this.error = ""
                    localStorage.setItem('token', body.data.user.token)
                    this.$router.push('/');
                }
            })
        },
        authenticateUser() {
            const token = localStorage.getItem('token')
            if (token) {
                fetch(`http://localhost:8081/backend/users/${token}`, {
                    method: 'GET',
                })
                .then((res) => res.json())
                .then((body) => {
                    if (body.data != null) {
                        this.setCurrentUser(body.data.user)
                    } else {
                        this.setCurrentUser(null)
                    }
                })
            }
            // if (this.user != null) this.$router.push('/')
        }
    },
    computed: {
        ...mapState(useCurrentUserStore, ['user']),
        isError() {
            return this.error !== "";
        }
    },
    created () {
        // console.log(this.user)
        // this.getCurrentUser()
        this.authenticateUser()
    }
}