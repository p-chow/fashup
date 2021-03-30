<template>
  <div
    class="imgArea"
    v-bind:style="{ 'background-image': `url(${imageData})` }"
    v-on:click="insertImg"
  >
    <span v-if="!imageData" class="placeholder">
      + <br />
      Upload an Image
    </span>
    <input
      class="picInput"
      ref="fileInput"
      type="file"
      v-on:input="onSelectFile"
      v-on:change="onSelectFile"
      accept="image/*"
      required
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageData: null,
    };
  },
  methods: {
    insertImg() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
  },
};
</script>

<style scoped>
.imgArea {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  background: #a09b9b;
  width: 150%;
  height: 150%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
  text-align: center;
}

.picInput {
  display: none;
}
</style>
