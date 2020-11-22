<template>
  <v-card>
    <v-card-title class="pb-3">
      Sayfa Düzenleme
    </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="pagesForm.valid" class="px-10 pt-2">
      <v-row>
        <v-col cols="6">
          <v-text-field ref="name" v-model="updateItems['title_' + item.code]"
                        v-for="item in $store.state.form.languages" :key="item.id"
                        :label="'baslik ' + item.code.toUpperCase()" placeholder="Baslik giriniz" dense
                        outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field ref="name" v-model="updateItems['keywords_' + item.code]"
                        v-for="item in $store.state.form.languages" :key="item.id"
                        :label="'keywords ' + item.code.toUpperCase()" placeholder="Keywords giriniz" dense
                        outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field ref="name" v-model="updateItems.redirectionLink"
                        label="link" placeholder="Link yonlendirme" outlined dense></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field ref="name" v-model="updateItems.rank"
                        label="Sıralama" placeholder="Sıralama" outlined dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea counter v-model="updateItems['description_' + item.code]" v-for="item in $store.state.form.languages"
                      :key="item.id"
                      :label="'Ozet ' + item.code.toUpperCase()" placeholder="ozet giriniz"
                      outlined dense></v-textarea>
        </v-col>
        <v-col cols="12">
          <div v-for="item in $store.state.form.languages" :key="item.id">
            <label class="custom-label" v-text="'Icerik ' + item.code.toUpperCase()"></label>
            <Editor :data="updateItems" dataItem="detail_" :lang="item"></Editor>
          </div>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="6">
          <v-select :items="pagePropertyList" v-model="updateItems.SpecificationId" item-text="name" item-value="id"
                    label="Sayfa Ozelligi" outlined dense></v-select>
        </v-col>
        <v-col cols="6">
          <v-select :items="$store.state.pages.pages" v-model="updateItems.parentId" default="id" item-text="title"
                    item-value="id"
                    label="Ust Sayfalar" outlined dense></v-select>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="6">
              <v-checkbox v-model="updateItems.isActive" label="Ust menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox v-model="updateItems.isFooter" label="Alt menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6"></v-col>
        <v-col cols="2" class="px-7 py-0">
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
      pagesForm: {topPages:null},
      updateItems: {},
      page_id:this.$route.params.id
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
      this.updateItems=response.data;
    },
    updatePage(){
      this.api_post('/pages/update/',{
        page:this.updateItems,
      },this.successUpdate)
    },
    successUpdate(){
      this.Error_Message('İslem Basarılı', '', 'success')
      this.$router.push({name: 'List'})
    }

  }
}
</script>

<style scoped>

</style>

