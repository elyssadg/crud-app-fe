<script>
import Button from './Button.vue'
import { useCurrentUserStore } from '../stores/authenticated-user.js'
import { mapActions, mapState } from 'pinia'

export default {
    name: "NavigationBar",
    components: {
        Button
    },
    methods: {
        ...mapActions(useCurrentUserStore, ['getCurrentUser', 'setCurrentUser']),
        logout() {
            fetch(`http://localhost:8081/backend/users/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    token: localStorage.getItem('token')
                })
                })
                .then((res) => res.json())
                .then(body => {
                    localStorage.removeItem('token')
                    this.setCurrentUser(null)
                    this.$router.push('/login')
                })
        }
    },
    computed: {
        ...mapState(useCurrentUserStore, ['user']),
        isAuth() {
            return this.user !== null
        }
    }
}
</script>


<template>
    <nav class="p-6 bg-black">
        <div class="flex justify-between">
            <RouterLink to="/" class="flex gap-2 justify-center items-center text-heading text-white font-bold">
                <img src="../assets/open-box.png" alt="app icon" class="w-[28px]">
                StorEase
            </RouterLink>

            <div v-if="isAuth" class="flex justify-center items-center gap-2">
                <p class="text-name text-white mr-2">Hi, {{ user.username }}</p>
                <span class="text-name text-white">|</span>
                <Button class="text-white" text="Logout" @click="this.logout()"></Button>
            </div>
            
            <div v-else class="flex gap-4 justify-center items-center">
                <RouterLink to="/login" class="text-name text-white">Login</RouterLink>
                <RouterLink to="/register" class="text-name text-white">Register</RouterLink>
            </div>
        </div>
    </nav>
</template>