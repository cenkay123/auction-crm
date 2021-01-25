<template>
  <v-card>
    <v-card-title class="pb-3">
      Yeni Olustur
    </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="pagesForm.valid" class="px-10 pt-2 formClass">
      <v-row>
        <v-col cols="12">
          <v-text-field ref="name" v-model="pagesForm['title_' + item.code]" v-for="item in $store.state.form.languages"
                        :key="item.id"
                        label="Baslik" placeholder="Baslik giriniz" dense
                        outlined>
            <template v-slot:prepend>
              <v-img class="img-right" :src="require('../../assets/'+item.code+'.png')" max-width="30"></v-img>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field ref="name" v-model="pagesForm.RedirectionLink"
                        label="Link" placeholder="Link yonlendirme" outlined dense></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field ref="name" type="number" v-model="pagesForm.rank"
                        label="Sıralama" placeholder="Sıralama" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea counter v-model="pagesForm['description_' + item.code]"
                      v-for="item in $store.state.form.languages" :key="item.id"
                      label="Açıklama" placeholder="Açıklama giriniz"
                      outlined dense>
             <template v-slot:prepend>
              <v-img class="img-right" :src="require('../../assets/'+item.code+'.png')" max-width="30"></v-img>
            </template>
          </v-textarea>
        </v-col>
        <v-col cols="12">
          <div class="mb-5" v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label">İçerik</label>
            <img :src="require('../../assets/'+item.code+'.png')" class="label-in-Img" height="150"/>
            <Editor :data="pagesForm" class="mt-3 mb-4" dataItem="detail_" :lang="item"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yükle</label>
          <vue-dropzone ref="myVueDropzone" class="mt-3" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="6">
              <v-checkbox v-model="pagesForm.isMain" label="Aktif/Pasif" class="mt-0"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="pl-0">
          <v-col cols="2">
            <v-btn class="login-btn" color="success" @click="createGallery">Kaydet</v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Editor from "@/components/basicFormComponents/Editor";

export default {
  name: "Create",
  components: {
    Editor,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      pagePropertyList: [],
      pagesForm: {parentId: this.$route.params.page_id},
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
    }
  },
  methods: {
    createGallery() {
      this.api_post('/subgallerypages/add', {
        page: this.pagesForm
      }, this.successG, this.error)
    },
    successG() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'galleryPage', query: {page_id: this.page_id}})
    },
    error() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
  },
}
</script>

<style scoped>
</style>

