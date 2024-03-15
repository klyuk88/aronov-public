<script setup>
import { ref } from 'vue'
const props = defineProps(['modelValue', 'required']);
const fileName = ref('')
const emits = defineEmits(["update:modelValue"]);
const getFile = (e) => {
  fileName.value = e.target.files[0].name
  emits("update:modelValue", e.target.files);
};
</script>
<template>
  <label class="w-100 d-flex justify-content-between align-items-center">
    <input type="file" name="" class="file-input d-none" @change="getFile($event)" :required="props.required ?? false" accept=".doc,.docx,application/msword,application/pdf"/>
    <span class="career-file-text">
      {{fileName}}
    </span>
    <span
      class="
        career-btn
        border border-white
        py-3
        d-flex
        align-items-center
        justify-content-center
      "
      style="--bs-border-opacity: 0.5"
      >{{ $t("Load file") }}</span
    >
  </label>

  
</template>

<style lang="scss" scoped>
label {
  cursor: pointer;
}
.career-file-text {
  font-size: 14px;
  font-weight: 300;
}
.career-btn {
  width: 65%;
}

</style>