<template>
  <v-card>
    <v-card-title class="pb-3">
      Sanatçı Güncelle
    </v-card-title>
    <v-divider></v-divider>
    <v-form class="px-4 px-md-10 pt-2">
      <v-row>
        <v-col cols="12">
          <v-text-field ref="name" v-model="artistsItem.nameSurname" label="Ad Soyad" placeholder="Ad Soyad" dense
                        outlined></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu v-model="menuStart" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                  offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="artistsItem.birthDate" label="Doğum tarihi" placeholder="Doğum tarihi" readonly
                            v-bind="attrs" v-on="on" outlined></v-text-field>
            </template>
            <v-date-picker v-model="artistsItem.birthDate" @input="menuStart = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu v-model="menuEnd" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                  offset-y min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="artistsItem.dateOfDeath" label="Vefat tarihi" placeholder="Vefat tarihi" readonly
                            v-bind="attrs" v-on="on" outlined></v-text-field>
            </template>
            <v-date-picker v-model="artistsItem.dateOfDeath" @input="menuEnd = false"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="artistsItem.link"
                          class="col-md-12 px-2"
                          label="Link" placeholder="Link yönlendirme" outlined dense></v-text-field>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-text-field ref="name" v-model="artistsItem.rank"
                          class="col-md-12 px-1"
                          label="Sıra" placeholder="Sırası" outlined dense></v-text-field>
          </v-row>
        </v-col>

        <v-col cols="12">
          <div>
            <label class="custom-label" v-text="'Sanatçı bilgisi ' + $store.state.form.selectedLanguage.code.toUpperCase()"></label>
            <Editor :data="artistsItem" dataItem="about_" class="mt-3 mb-4" :lang="$store.state.form.selectedLanguage"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" class="mt-3" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              <v-checkbox v-model="artistsItem.isActive" label="Status Durumu" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="10"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" class="py-0">
          <v-btn class="login-btn" color="success" @click="updateArtistsItem">Kaydet</v-btn>
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
  name: "ArtistsUpdate",
  components: {
    Editor,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      menuStart: false,
      menuEnd: false,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
      artistsItem: {}
    }
  },
  mounted() {
    this.fetchArtistsItem()
  },
  methods: {
    fetchArtistsItem() {
      this.api_get('/artists/' + this.$route.params.id, this.successArtistsItem);
    },
    successArtistsItem(response) {
      this.artistsItem = response.data;
      this.artistsItem.birthDate = new Date(this.artistsItem.birthDate).toISOString().substr(0, 10);
      this.artistsItem.dateOfDeath = new Date(this.artistsItem.dateOfDeath).toISOString().substr(0, 10)
    },
    updateArtistsItem() {
      this.api_post('/artists/update', {
        Artist: this.artistsItem
      }, this.succeessUpdate, this.errorUpdate)
    },
    succeessUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'ArtistsList'})
    },
    errorUpdate() {
      this.Error_Message('İslem Hatalı', 'Tekrar deneyiniz', 'error')
    }
  }
}
</script>

<style scoped>

</style>
