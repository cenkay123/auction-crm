<template>
  <v-card>
    <v-card-title class="pb-3">
      Yeni Sayfa Olustur
    </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="pagesForm.valid" class="px-1 px-md-10 pt-2">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field ref="name" v-model="pagesForm['title_' + item.code]" v-for="item in $store.state.form.languages" :key="item.id"
                        :label="'baslik ' + item.code.toUpperCase()" placeholder="Baslik giriniz" dense
                        outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" v-model="pagesForm['keywords_' + item.code]" v-for="item in $store.state.form.languages" :key="item.id"
                        :label="'Keywords ' + item.code.toUpperCase()" placeholder="Keywords giriniz" dense
                        outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" v-model="pagesForm.RedirectionLink"
                        label="link" placeholder="Link yonlendirme" outlined dense></v-text-field>
        </v-col>
         <v-col cols="12" md="6">
          <v-text-field ref="name" type="number" v-model="pagesForm.rank"
                        label="Sıralama" placeholder="Sıralama" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea counter v-model="pagesForm['description_' + item.code]" v-for="item in $store.state.form.languages" :key="item.id"
                      :label="'Ozet ' + item.code.toUpperCase()" placeholder="ozet giriniz"
                      outlined dense></v-textarea>
        </v-col>
        <v-col cols="12">
          <div v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label" v-text="'Icerik ' + item.code.toUpperCase()"></label>
            <Editor :data="pagesForm" dataItem="detail_" :lang="item"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="6">
          <v-select :items="pagePropertyList" v-model="pagesForm.SpecificationId" item-text="name" item-value="id"
                    label="Sayfa Ozelligi" outlined dense></v-select>
        </v-col>
        <v-col cols="6">
          <v-select :items="$store.state.pages.pages" v-model="pagesForm.ParentId" default="id" item-text="title"
                    item-value="id"
                    label="Ust Sayfalar" outlined dense></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="6">
              <v-checkbox v-model="pagesForm.IsMain" label="Ust menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox v-model="pagesForm.IsFooter" label="Alt menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6"></v-col>
        <v-col cols="12" md="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="createPage">Kaydet</v-btn>
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
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
      pagesForm: {},
    }
  },
  mounted() {
    this.fetchSpecifications();
  },
  methods: {
    fetchSpecifications() {
      this.api_get('/pagespecifications', this.successSpecifications)
    },
    successSpecifications(response) {
      this.pagePropertyList = response.data;
    },
    createPage() {
      this.api_post('/pages/add', {
        page: this.pagesForm
      }, this.successPage, this.errorPage)
    },
    successPage() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'List'})
    },
    errorPage() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
  },
}
</script>

<style scoped>
</style>

