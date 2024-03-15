<script setup>
const props = defineProps({
  placeHolder: String,
  modelValue: String,
  required: {
    type: Boolean,
    default: true
  }
})
</script>
<template>
  <textarea :placeholder="props.placeHolder" @input="$emit('update:modelValue', $event.target.value)" :required="props.required"></textarea>
</template>

<style lang="scss">
textarea {
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

textarea::placeholder {
  font-size: 16px;
  font-weight: 300;
  color: #000;
  opacity: 0.5;
  font-family: "Inter";
}
textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  color: var(--accent-color);
}
textarea:focus::placeholder {
  color: var(--accent-color);
}
textarea {
  padding-bottom: 0;
  margin-bottom: 0;
}

textarea.white {
  color: #fff;
  border-color: #fff;
}
textarea.white::placeholder {
  color: #fff;
}

textarea.white:focus {
  border-color: var(--accent-color);
  color: var(--accent-color);
}
  
</style>