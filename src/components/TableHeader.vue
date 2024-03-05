<template>
    <th class="w-[25%] text-name text-white font-medium">{{ this.header }}</th>
</template>

<script>
export default {
    props: {
        header: {
            type: String,
            default: ""
        }
    }
}
</script>