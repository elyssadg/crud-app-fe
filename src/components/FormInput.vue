<template>
    <div class="mt-4">
        <label class="text-subname text-black font-normal">{{ label }}</label>
        <input class="w-full pb-1 border-b-purple-mid border-b-2 outline-none bg-transparent"
                v-bind="$attrs"
                :disabled="disabled"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)">
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ""
        },
        modelValue: {
            type: [String, Number],
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>