<template>
  <v-card>
    <v-card-title class="pb-3">
      Slayt Guncelle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="slaytUpdateData['title_' + item.code]"
                          v-for="item in $store.state.form.languages" :key="item.id"
                          :label="'baslik ' + item.code.toUpperCase()" placeholder="Baslik giriniz" dense
                          outlined class="col-md-6 px-1"></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="slaytUpdateData['summary_' + item.code]"
                        v-for="item in $store.state.form.languages"
                        :key="item.id"
                        :label="'Aciklama ' + item.code.toUpperCase()" placeholder="aciklama giriniz"
                        outlined dense class="col-md-6 px-1"></v-textarea>
          </v-row>
        </v-col>

        <v-col cols="12">
          <div v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label" v-text="'content ' + item.code.toUpperCase()"></label>
            <ckeditor :editor="editor" v-model="slaytUpdateData['content_' + item.code]"></ckeditor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              <v-checkbox v-model="slaytUpdateData.isActive" label="Status Durumu" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="10"></v-col>
          </v-row>
        </v-col>
        <v-col cols="2" class="py-0">
          <v-btn class="login-btn" color="success" @click="updateSlayt">Kaydet</v-btn>
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
  name: "SlaytsUpdate",
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
      slaytUpdateData: {},
    }
  },
  mounted() {
    this.fetchSlayt()
  },
  methods: {
    fetchSlayt() {
      this.api_get('/sliders/' + this.$route.params.id, this.successFetchItem, this.slaytUpdateError);
      this.$store.state.settings.loader=true;
    },
    successFetchItem(response) {
      this.slaytUpdateData = response.data
      this.$store.state.settings.loader=false;
    },
    slaytUpdateError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error');
    },
    updateSlayt() {
      this.api_post('/sliders/update', {
        slider: this.slaytUpdateData
      }, this.successUpdate, this.errorUpdate);
      this.$store.state.settings.loader=true;
    },
    successUpdate() {
     this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Slayts'})
    },
    errorUpdate() {
     this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>