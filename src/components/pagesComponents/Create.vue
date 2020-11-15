<template>
  <v-card>
    <v-card-title class="pb-3">
      Yeni Sayfa Olustur
      <v-spacer></v-spacer>
      <FormLang></FormLang>
    </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="pagesForm.valid" class="px-10 pt-2">
      <v-row>
        <v-col cols="6">
          <v-text-field ref="name" v-model="pagesForm.title"
                        label="Baslik" placeholder="Baslik giriniz" dense
                        outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field ref="name" v-model="pagesForm.keywords"
                         label="Keywords" placeholder="Keywords giriniz" dense
                         outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field ref="name" v-model="pagesForm.pageUrl"
                        label="Link" placeholder="Link yonlendirme" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea counter v-model="pagesForm.summary"
                      label="Ozet" placeholder="ozet giriniz"
                      outlined dense></v-textarea>
        </v-col>
        <v-col cols="12">
          <label class="custom-label">Icerik</label>
          <ckeditor :editor="editor" v-model="pagesForm.editor"></ckeditor>
        </v-col>
        <v-col cols="12" v-if="!$route.query.pageId">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="6" v-if="!$route.query.pageId">
          <v-select :items="pagePropertyList" v-model="pagesForm.pageProperty" item-text="name" item-value="id"
                    label="Sayfa Ozelligi" outlined dense></v-select>
        </v-col>
        <v-col cols="6" v-if="!$route.query.pageId">
          <v-select :items="$store.state.pages.pages" v-model="pagesForm.topPages" default="id" item-text="title"
                    item-value="id"
                    label="Ust Sayfalar" outlined dense></v-select>
        </v-col>
        <v-col cols="6" v-if="!$route.query.pageId">
          <v-row>
            <v-col cols="6">
              <v-checkbox v-model="pagesForm.topMenu" label="Ust menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox v-model="pagesForm.bottomMenu" label="Alt menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6"></v-col>
        <v-col cols="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="createPage" :loading="loading" :disabled="loading">Kaydet
            <template v-slot:loader>
              <span>Loading...</span>
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import FormLang from "@/components/FormLang";

export default {
  name: "Create",
  components: {
    FormLang,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      editor: ClassicEditor,
      pagePropertyList: [],
      topPagesList: ['Ust Sayfa', 'Hakkimizda', 'Urunler', 'Sayfa-3', 'Sayfa-4'],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
      pagesForm: {
        valid: false,
        title: null,
        keywords: null,
        summary: null,
        pageUrl: null,
        editor: null,
        pageProperty: null,
        topPages: null,
        topMenu: false,
        bottomMenu: false,
      },
      loading: false
    }
  },
  watch: {
    '$route.query.lang' () {
      this.refreshObject()
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
      this.pagesForm.pageProperty = this.pagePropertyList[0].id;
    },
    createPage() {
      if(this.$route.query.pageId) {
        this.api_post('/pages/update', {
          Id: Number(this.$route.query.pageId),
          LanguageId: Number(this.$route.query.lang),
          IsUpdateFields: false,
          Title: this.pagesForm.title,
          Keywords: this.pagesForm.keywords,
          Description: this.pagesForm.summary,
          Detail: this.pagesForm.editor,
        }, this.successPage, this.errorPage)
      }else {
        this.api_post('/pages/add', {
          Title: this.pagesForm.title,
          Keywords: this.pagesForm.keywords,
          Description: this.pagesForm.summary,
          Detail: this.pagesForm.editor,
          RedirectionLink: this.pagesForm.pageUrl,
          SpecificationId: this.pagesForm.pageProperty,
          parent_id: this.pagesForm.topPages,
          IsMain: this.pagesForm.topMenu,
          isActive: true,
          IsFooter: this.pagesForm.bottomMenu,
          LanguageId: Number(this.$route.query.lang),
          PageBanners: [{
            PictureUrl: "blabla.jpg"
          }]
        }, this.successPage, this.errorPage)
      }
    },
    successPage(response) {
      this.Error_Message('İslem Basarılı', '', 'success')
      if(this.$route.query.pageId) {
        this.$router.push({name: 'List'})
      }else {
        this.$router.push({query: {lang: this.$route.query.lang, pageId: response.data}});
      }
    },
    errorPage() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
    refreshObject() {
      this.pagesForm = {
        valid: false,
        title: null,
        keywords: null,
        summary: null,
        pageUrl: null,
        editor: null,
        pageProperty: {},
        topPages: false,
        topMenu: false,
        bottomMenu: false,
      }
    }
  },
}
</script>

<style scoped>
</style>

