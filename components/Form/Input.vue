<script setup>
const props = defineProps({
  placeHolder: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String,
  required: {
    type: Boolean,
    default: true
  }
})
defineEmits(['update:modelValue'])
</script>
<template>
  <input :type="props.type" :placeholder="props.placeHolder" class="input" @input="$emit('update:modelValue', $event.target.value)" :required="props.required" />
</template>


<style lang="scss">
.input {
  font-size: 15px;
  font-weight: 300;
  color: var(--dark-color);
  border: none;
  border-radius: 0;
  background: transparent;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(33, 33, 33, 0.5);
  width: 100%;
  margin-bottom: 35px;
  font-family: "Inter";
  @media screen and (max-width: 576px) {
    margin-bottom: 25px;
  }
}

.input::placeholder {
  font-size: 16px;
  font-weight: 300;
  color: #111;
  opacity: 0.5;
  font-family: "Inter";
}
.input:focus {
  outline: none;
  border-color: var(--accent-color);
  color: var(--accent-color);
}
// .input:focus::placeholder {
//   color: var(--accent-color);
// }

.input.white {
  color: #fff;
  border-color: #fff;
}
.input.white::placeholder {
  color: #fff;
}

.input.white:focus {
  border-color: var(--accent-color);
  // color: var(--accent-color);
}
// .input.white:focus::placeholder {
//   color: var(--accent-color);
// }


</style>