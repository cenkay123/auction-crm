<template>

  <v-card>
    <v-card-title class="pb-3">Yeni ekleme</v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="popupPostdata['title_' + $store.state.form.selectedLanguage.code]"
                          label="Baslik" placeholder="Baslik giriniz" dense
                          outlined class="col-md-12 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12" class="pl-5">
          <v-row>
            <v-text-field ref="name" v-model="popupPostdata.RedirectionLink"
                          label="Link" placeholder="Link yonlendirme" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="popupPostdata['description_' + $store.state.form.selectedLanguage.code]"
                        label="Açıklama" placeholder="Açıklama giriniz"
                        outlined dense class="col-md-12 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
              </template>
            </v-textarea>
          </v-row>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone"  class="mt-3" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="popupPostdata.IsActive" label="Aktif/Pasif" class="mt-0"></v-checkbox>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn class="login-btn" color="success" @click="addData">Kaydet</v-btn>
        </v-col>
        <v-col cols="10"></v-col>
      </v-row>
    </v-form>
  </v-card>

</template>

<script>
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "PopupCreate",
  components: {
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
      popupPostdata: {
        IsActive: true,
      },
    }
  },
  methods: {
    addData() {
      this.api_post('/popups/add', {
        popups: this.popupPostdata
      }, this.addSuccess, this.addError);
    },
    addSuccess() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Popup'})
    },
    addError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>
