<script src="./js/register.js"></script>

<template>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 w-[40%] mx-auto my-10 p-10 bg-purple-light rounded-default shadow-md">
        <h1 class="text-title text-purple-mid font-medium">Register</h1>
        <FormInput type="text" label="Username" v-model="username" />
        <FormInput type="password" label="Password" v-model="password" />
        <FormInput type="text" label="Name" v-model="name" />
        <p v-if="isError" class="text-red text-subname mt-4">{{ this.error }}</p>
        <Button text="Register" class="w-full mt-5 bg-purple-mid text-white" @click="this.register()"></Button>
    </div>
</template>