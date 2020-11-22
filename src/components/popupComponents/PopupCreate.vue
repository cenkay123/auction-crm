<template>

  <v-card>
    <v-card-title class="pb-3">Yeni  ekleme</v-card-title>
    <v-divider></v-divider>
    <v-form class="px-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="popupPostdata['title_' + item.code]"
                          v-for="item in $store.state.form.languages" :key="item.id"
                          :label="'Baslik ' + item.code.toUpperCase()" placeholder="Baslik giriniz" dense
                          outlined class="col-md-6 px-1"></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="popupPostdata.RedirectionLink"
                          label="Link" placeholder="Link yonlendirme" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="popupPostdata['description_' + item.code]"
                        v-for="item in $store.state.form.languages"
                        :key="item.id"
                        :label="'Açıklama ' + item.code.toUpperCase()" placeholder="Açıklama giriniz"
                        outlined dense class="col-md-6 px-1"></v-textarea>
          </v-row>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="popupPostdata.IsActive" label="Aktif/Pasif" class="mt-0"></v-checkbox>
        </v-col>
        <v-col cols="2" class="px-7 py-0">
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