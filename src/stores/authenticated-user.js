import { defineStore } from "pinia"

export const useCurrentUserStore = defineStore('currentUser', {
    state: () => ({
        user: null
    }),
    actions: {
        setCurrentUser(user) {
            this.user = user
        },
        getCurrentUser() {
            const token = localStorage.getItem('token')
            if (token) {
                fetch(`http://localhost:8081/backend/users/${token}`, {
                    method: 'GET',
                })
                .then((res) => res.json())
                .then((body) => {
                    if (body.data != null) {
                        this.user = body.data.user
                    } 
                })
            }
        }
    }
})