<template>
  <v-card>
    <v-card-title class="pb-3">
      Sayfa Düzenleme
    </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="pagesForm.valid" class="px-2 px-md-10 pt-2 formClass">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field ref="name" v-model="updateItems['title_' + $store.state.form.selectedLanguage.code]"
                        label="Sayfa adi" placeholder="Sayfa adi giriniz" dense
                        outlined>
            <template v-slot:prepend>
              <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" v-model="updateItems['keywords_' + $store.state.form.selectedLanguage.code]"
                        label="keywords" placeholder="Keywords giriniz" dense
                        outlined>
            <template v-slot:prepend>
              <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" v-model="updateItems.redirectionLink"
                        label="Link" placeholder="Link yonlendirme" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field ref="name" type="number" v-model="updateItems.rank"
                        label="Sıralama" placeholder="Sıralama" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea counter v-model="updateItems['description_' + $store.state.form.selectedLanguage.code]"
                      label="Açıklama" placeholder="ozet giriniz"
                      outlined dense>
            <template v-slot:prepend>
              <v-img class="img-right" :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" max-width="30"></v-img>
            </template>
          </v-textarea>
        </v-col>
        <v-col cols="12">
          <div>
            <label class="custom-label" v-text="'İçerik ' + $store.state.form.selectedLanguage.code.toUpperCase()"></label>
            <img :src="require('../../assets/'+$store.state.form.selectedLanguage.code+'.png')" class="label-in-Img" height="150"/>
            <Editor :data="updateItems" class="mt-3 mb-4" dataItem="detail_" :lang="$store.state.form.selectedLanguage"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yükle</label>
          <vue-dropzone ref="myVueDropzone" class="mt-3" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="6">
          <v-select :items="pagePropertyList" v-model="updateItems.specificationId" item-text="name" item-value="id"
                    label="Sayfa tipi"  outlined dense></v-select>
        </v-col>
        <v-col cols="6">
          <v-select :items="$store.state.pages.pages"  v-model="updateItems.parentId" default="id" item-text="title"
                    item-value="id"
                    label="Üst Sayfalar" outlined dense></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="5">
              <v-checkbox v-model="updateItems.isMain" label="Üst menüde gözüksün" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="5">
              <v-checkbox v-model="updateItems.isFooter" label="Alt menüde gözüksün" class="mt-0"></v-checkbox>
            </v-col>
             <v-col cols="2">
              <v-checkbox v-model="updateItems.isActive" label="Durumu" class="mt-0"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6"></v-col>
        <v-col cols="12" md="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="updatePage">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import Editor from "@/components/basicFormComponents/Editor";

export default {
  name: "Update",
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
      pagesForm: {topPages: null},
      updateItems: {},
      page_id: this.$route.params.id
    }
  },

  mounted() {
    this.getData();
    this.fetchSpecifications();
  },
  methods: {
    getData() {
      this.api_get('/pages/' + this.page_id, this.successFetchPages)
    },
    fetchSpecifications() {
      this.api_get('/pagespecifications', this.successSpecifications)
    },
    successSpecifications(response) {
      this.pagePropertyList = response.data;
      this.pagesForm.pageProperty = this.pagePropertyList[0].id;
    },
    successFetchPages(response) {
      this.updateItems = response.data;
    },
    updatePage() {
      this.api_post('/pages/update/', {
        page: this.updateItems,
      }, this.successUpdate)
    },
    successUpdate() {
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'List'})
    }

  }
}
</script>

<style scoped>

</style>

