<template>
  <v-card>
    <v-card-title class="pb-3">Yeni Slider ekleme</v-card-title>
    <v-divider></v-divider>
    <v-form class="px-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="slaytpostData['Title_' + item.code]"
                          v-for="item in $store.state.form.languages" :key="item.id"
                          :label="'baslik ' + item.code.toUpperCase()" placeholder="Baslik giriniz" dense
                          outlined class="col-md-6 px-1"></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="slaytpostData.link"
                          label="link" placeholder="Link yonlendirme" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="slaytpostData['summary_' + item.code]"
                        v-for="item in $store.state.form.languages"
                        :key="item.id"
                        :label="'Aciklama ' + item.code.toUpperCase()" placeholder="aciklama giriniz"
                        outlined dense class="col-md-6 px-1"></v-textarea>
          </v-row>
        </v-col>
        <v-col cols="12">
          <div v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label" v-text="'İçerik ' + item.code.toUpperCase()"></label>
            <ckeditor :editor="editor" v-model="slaytpostData['content_' + item.code]"></ckeditor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="slaytpostData.IsActive" label="Aktif/Pasif" class="mt-0"></v-checkbox>
        </v-col>
        <v-col cols="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="addSlayt">Kaydet</v-btn>
        </v-col>
        <v-col cols="10"></v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: "SlaytsCreate",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      editor: ClassicEditor,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
      slaytpostData: {
        IsActive: true,
      },
    }
  },
  methods: {
    addSlayt() {
      this.api_post('/sliders/add', {
        slider: this.slaytpostData
      }, this.addSuccess, this.addError);
      this.$store.state.settings.loader=true;
    },
    addSuccess() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Slayts'})
    },
    addError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>