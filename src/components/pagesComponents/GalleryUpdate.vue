<template>
  <v-card>
    <v-card-title class="pb-3">
      Yeni Olustur
    </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="pagesForm.valid" class="px-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-text-field ref="name" v-model="updateItems['title_' + item.code]"
                        v-for="item in $store.state.form.languages" :key="item.id"
                        :label="'Baslik ' + item.code.toUpperCase()" placeholder="Baslik giriniz" dense
                        outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field ref="name" v-model="updateItems.redirectionLink"
                        label="Yönlendirme linki" placeholder="Yönlendirme linki" outlined dense></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field ref="name" v-model="updateItems.rank"
                        label="Sıralama" placeholder="Sıralama" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea counter v-model="updateItems['description_' + item.code]" v-for="item in $store.state.form.languages"
                      :key="item.id"
                      :label="'Açıklama ' + item.code.toUpperCase()" placeholder="Açıklama giriniz"
                      outlined dense></v-textarea>
        </v-col>
        <v-col cols="12">
          <div class="mb-5" v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label" v-text="'Icerik ' + item.code.toUpperCase()"></label>
            <Editor :data="updateItems" dataItem="detail_" :lang="item"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
      </v-row>
      <v-col cols="6"></v-col>
      <v-col cols="2" class="px-7 py-0">
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
      pagesForm: {topPages:null},
      updateItems: {},
      item_id:this.$route.query.item_id,
      page_id:this.$route.query.page_id,
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
      this.updateItems=response.data;
    },
    updateGallery(){
      this.api_post('/subgallerypages/update',{
        page:this.updateItems,
      },this.successUpdate)
    },
    successUpdate(){
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'galleryPage', query: {page_id: this.page_id}})
    }

  }
}
</script>

<style scoped>

</style>

