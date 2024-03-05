<script src="./js/login.js"></script>

<template class="relative">
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 w-[40%] mx-auto my-10 p-10 bg-purple-light rounded-default shadow-md">
        <h1 class="text-title text-purple-mid font-medium">Login</h1>
        <FormInput type="text" label="Username" v-model="username" />
        <FormInput type="password" label="Password" v-model="password" />
        <p v-if="isError" class="text-red text-subname mt-4">{{ this.error }}</p>
        <Button text="Login" class="w-full mt-5 bg-purple-mid text-white" @click="this.login()"></Button>
    </div>
</template>