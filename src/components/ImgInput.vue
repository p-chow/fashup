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
      id = "myimg"
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
import { EventPassing } from "../passingid.js";
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
      input.type = 'file';
      input.onchange = e =>{
        var files = e.target.files;
        var reader = new FileReader();
        reader.onload = function() {
			document.getElementById("myimg").src = reader.result;
		}
		reader.readAsDataURL(files[0]);
		EventPassing.$emit('pass-files', files[0])
      }
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
  width: 250px;
  height: 250px;
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
