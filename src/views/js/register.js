import FormInput from '../../components/FormInput.vue'
import Button from '../../components/Button.vue'
import { useCurrentUserStore } from '../../stores/authenticated-user.js'
import { mapActions, mapState } from 'pinia'

export default {
    name: "Register",
    components: {
        FormInput,
        Button
    },
    data () {
        return {
            username: "",
            password: "",
            name: "",
            error: ""
        }
    },
    methods: {
        ...mapActions(useCurrentUserStore, ['getCurrentUser', 'setCurrentUser']),
        register() {
            fetch(`http://localhost:8081/backend/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username: this.username,
                    password: this.password,
                    name: this.name
                })
            })
            .then((res) => res.json())
            .then(body => {
            if (body.code !== 200) {
                this.error = body.message
            } else {
                this.error = ""
                this.$router.push('/login');
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
                        this.$router.push('/')
                    }
                })
            }
            // if (this.getCurrentUser() != null) this.$router.push('/')
        }
    },
    computed: {
        isError() {
            return (this.error === "") ? false : true;
        }
    },
    created () {
        this.authenticateUser()
    }
}