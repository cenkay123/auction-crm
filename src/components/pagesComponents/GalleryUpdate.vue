<template>
  <v-card>
    <v-card-title class="pb-3">
      Yeni Olustur
    </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="pagesForm.valid" class="px-4 px-md-10 pt-2 formClass">
      <v-row>
        <v-col cols="12">
          <v-text-field ref="name" v-model="updateItems['title_' + $store.state.form.selectedLanguage.code]"
                        label="Başlık" placeholder="Başlık giriniz" dense
                        outlined>
            <template v-slot:prepend>
              <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" v-model="updateItems.redirectionLink"
                        label="Yönlendirme linki" placeholder="Yönlendirme linki" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" v-model="updateItems.rank"
                        label="Sıralama" placeholder="Sıralama" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea counter v-model="updateItems['description_' + $store.state.form.selectedLanguage.code]"
                      label="Açıklama" placeholder="Açıklama giriniz"
                      outlined dense>
            <template v-slot:prepend>
              <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
            </template>
          </v-textarea>
        </v-col>
        <v-col cols="12">
          <div class="mb-5">
            <label class="custom-label">İçerik</label>
            <img :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" class="label-in-Img" height="150"/>
            <Editor :data="updateItems" dataItem="detail_" class="mt-3 mb-4" :lang="$store.state.form.selectedLanguage"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" class="mt-3" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-col cols="6">
            <v-checkbox v-model="updateItems.isMain" label="Aktif/Pasif" class="mt-0"></v-checkbox>
          </v-col>
        </v-col>
      </v-row>
      <v-col cols="12" md="2" class="pl-0">
        <v-btn class="login-btn" color="success" @click="updateGallery">Kaydet</v-btn>
      </v-col>
    </v-form>
  </v-card>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import Editor from "@/components/basicFormComponents/Editor";

export default {
  name: "GalleryUpdate",
  components: {
    Editor,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
      pagesForm: {topPages: null},
      updateItems: {},
      item_id: this.$route.query.item_id,
      page_id: this.$route.query.page_id,
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.api_get('/pages/' + this.item_id, this.successFetchPages)
    },

    successFetchPages(response) {
      this.updateItems = response.data;
    },
    updateGallery() {
      this.api_post('/subgallerypages/update', {
        page: this.updateItems,
      }, this.successUpdate)
    },
    successUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'galleryPage', query: {page_id: this.page_id}})
    }

  }
}
</script>

<style scoped>

</style>

