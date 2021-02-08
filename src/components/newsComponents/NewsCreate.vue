<template>
  <v-card>
    <v-card-title class="pb-3">
      Yeni Haber Olustur
    </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="newsForm.valid" class="px-4 px-md-10 pt-2 ">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="newsForm['Title_' + $store.state.form.selectedLanguage.code]"
                          label="Başlık" placeholder="Başlık giriniz" dense
                          outlined class="col-md-6 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="newsForm['ShortDescription_' + $store.state.form.selectedLanguage.code]"
                        label="Açıklama" placeholder="Açıklama giriniz"
                        outlined dense class="col-md-6 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-textarea>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="newsForm.link"
                          class="col-md-12 px-2"
                          label="Link" placeholder="Link yönlendirme" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="newsForm.rank"
                          class="col-md-12 px-1"
                          label="Sıra" placeholder="Sırası" outlined dense></v-text-field>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-menu ref="menu" v-model="menuStart" :close-on-content-click="false" :return-value.sync="newsForm.StartDate"
                  transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="newsForm.StartDate" label="Yayınlanacağı tarih" outlined readonly v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="newsForm.StartDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuStart = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(newsForm.StartDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu ref="menu" v-model="menuEnd" :close-on-content-click="false" :return-value.sync="newsForm.EndDate"
                  transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="newsForm.EndDate" label="Yayından kalkacağı tarih" outlined readonly v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="newsForm.EndDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuEnd = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(newsForm.EndDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12">
          <div>
            <label class="custom-label">İçerik</label>
            <img :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" class="label-in-Img" height="150"/>
            <Editor :data="newsForm" dataItem="Detail_" class="mt-3 mb-4" :lang="$store.state.form.selectedLanguage"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yükle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile" class="mt-3"></vue-dropzone>
        </v-col>
        <v-col cols="12" md="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="createNews">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import Editor from "@/components/basicFormComponents/Editor";

var moment = require('moment');
export default {
  name: "NewsCreate",
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
      newsForm: {
        Picture: "picture1.png",
        IsActive: true,
        StartDate: new Date().toISOString().substr(0, 10),
        EndDate: moment().add(7, 'days').toISOString().substr(0, 10),
      },
      menuStart: false,
      menuEnd: false,
      modal: false,
    }
  },
  methods: {
    createNews() {
      this.api_post('/news/add', {
        news: this.newsForm
      }, this.successNews, this.errorNews)
    },
    successNews() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'NewsList'})
    },
    errorNews() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    },
  }
}
</script>

<style scoped>

</style>
