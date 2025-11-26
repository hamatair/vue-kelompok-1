<template>
    <div class="flex flex-col">
        <label class="font-semibold mb-1">{{ label }}</label>

        <input v-if="type !== 'select'" :type="type" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="border border-black-base rounded-md px-3 py-2" />

        <select v-else :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
            class="border border-black-base rounded-md px-3 py-2">
            <slot></slot>
        </select>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    type: { type: String, default: "text" },
    modelValue: [String, Number],
});
defineEmits(["update:modelValue"]);
</script>