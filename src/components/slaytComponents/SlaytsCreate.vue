<template>
  <v-card>
    <v-card-title class="pb-3">Yeni Slider ekleme</v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-text-field ref="name" v-model="slaytpostData['Title_' + item.code]"
                          v-for="item in $store.state.form.languages" :key="item.id"
                          label="Başlık" placeholder="Başlık giriniz" dense
                          outlined class="col-md-6">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+item.code+'.png')" max-width="30"></v-img>
              </template>
            </v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="slaytpostData.link"
                          class="col-md-12 px-2"
                          label="Link" placeholder="Link yönlendirme" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="slaytpostData.rank"
                          class="col-md-12 px-1"
                          label="Sıra" placeholder="Sırası" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-textarea counter v-model="slaytpostData['summary_' + item.code]"
                        v-for="item in $store.state.form.languages"
                        :key="item.id"
                        label="Açıklama" placeholder="Açıklama giriniz"
                        outlined dense class="col-md-6 px-1">
              <template v-slot:prepend>
                <v-img class="img-right" :src="require('../../assets/'+item.code+'.png')" max-width="30"></v-img>
              </template>
            </v-textarea>
          </v-row>
        </v-col>
        <v-col cols="12">
          <div v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label">İçerik</label>
            <img :src="require('../../assets/'+item.code+'.png')" class="label-in-Img" height="150"/>
            <Editor :data="slaytpostData" dataItem="content_" class="mt-3 mb-4" :lang="item"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" class="mt-3" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="slaytpostData.IsActive" label="Aktif/Pasif" class="mt-0"></v-checkbox>
        </v-col>
        <v-col cols="12" md="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="addSlayt">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import Editor from "@/components/basicFormComponents/Editor";

export default {
  name: "SlaytsCreate",
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
      slaytpostData: {
        IsActive: true,
      },
    }
  },
  methods: {
    addSlayt() {
      this.api_post('/sliders/add', {
        slider: this.slaytpostData
      }, this.addSuccess, this.addError);
      this.$store.state.settings.loader = true;
    },
    addSuccess() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'Slayts'})
    },
    addError() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>
