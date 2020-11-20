<template>
  <div id="app">
    <vue-editor use-custom-image-handler @image-added="handleImageAdded" v-model="data[dataItem + lang.code]" :editorOptions="editorSettings"></vue-editor>
  </div>
</template>

<script>
import { VueEditor,Quill } from 'vue2-editor'
import axios from "axios";
import ImageResize from 'quill-image-resize-vue';
import { ImageDrop } from 'quill-image-drop-module';

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export default {
  name: 'Editor',
  components: {
    VueEditor
  },
  props: ['data', 'lang', 'dataItem'],
  data() {
    return {
      htmlForEditor: "",
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {},
        }
      }
    };
  },

  methods: {
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      var vuex = window.localStorage.getItem('vuex')
      var token = JSON.parse(vuex);

      axios({
        url: "http://52.247.242.98:80/file/fileupload",
        method: "POST",
        data: formData,
        headers: {'Authorization': 'Bearer ' + token.auth.userToken}
      }).then(result => {
        let url = result.data.filePath; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      }).catch(err => {
        alert('yukleme basarisiz! ' + err)
      });
    }
  }
};
</script>
