<template>
  <v-card>
    <v-card-title class="pb-3">Yeni Sergi Ekleme</v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="sergiData['title_' + $store.state.form.selectedLanguage.code]"
                          label="Başlık" placeholder="Başlık giriniz" dense
                          outlined class="col-md-12">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="sergiData.PdfLink"
                          class="col-md-12 px-2"
                          label="Link" placeholder="Pdf linki" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="sergiData.rank"
                          class="col-md-12 px-1"
                          label="Sıra" type="number" placeholder="Sırası" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="sergiData['ShortDescription_' + $store.state.form.selectedLanguage.code]"
                        label="Açıklama" placeholder="Açıklama giriniz"
                        outlined dense class="col-md-12 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-textarea>
          </v-row>
        </v-col>

        <v-col cols="12" md="6">
          <v-menu ref="menu" v-model="menuStart" :close-on-content-click="false"
                  :return-value.sync="sergiData.StartDate"
                  transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="sergiData.StartDate" label="Yayınlanacağı tarih" outlined readonly v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="sergiData.StartDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuStart = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(sergiData.StartDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu ref="menu" v-model="menuEnd" :close-on-content-click="false" :return-value.sync="sergiData.EndDate"
                  transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="sergiData.EndDate" label="Yayından kalkacağı tarih" outlined readonly
                            v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="sergiData.EndDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuEnd = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(sergiData.EndDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12">
          <div>
            <label class="custom-label">İçerik</label>
            <img :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" class="label-in-Img" height="150"/>
            <Editor :data="sergiData" dataItem="LongDescription_" class="mt-3 mb-4" :lang="$store.state.form.selectedLanguage"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" class="mt-3" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="6">
          <v-checkbox v-model="sergiData.isActive" label="Aktif/Pasif" class="mt-0"></v-checkbox>
        </v-col>
        <v-col cols="6">
          <v-checkbox v-model="sergiData.isOnline" label="Canlı eser Aktif/Pasif" class="mt-0"></v-checkbox>
        </v-col>
        <v-col cols="12" md="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="addtoSergi">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import Editor from "@/components/basicFormComponents/Editor";
import vue2Dropzone from "vue2-dropzone";

var moment = require('moment');
export default {
  name: "ExhibitionsCreate",
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
      sergiData: {
        isActive: true,
        StartDate: new Date().toISOString().substr(0, 10),
        EndDate: moment().add(7, 'days').toISOString().substr(0, 10),
      },
      menuStart: false,
      menuEnd: false,
      modal: false,
    }
  },
  methods: {
    addtoSergi() {
      this.api_post('/exhibitions/add', {
        Exhibitions: this.sergiData
      }, this.addSuccess, this.addError);
    },
    addSuccess() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Exhibitions'})
    },
    addError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>
