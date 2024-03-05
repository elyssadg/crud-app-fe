<template>
    <button class="p-2 rounded-default text-name" :class="$attrs.class">{{ text }}</button>
</template>

<script>
export default {
    props: {
        action: String,
        text: String
    }
}
</script>

<style>

</style>