<template>
  <v-card>
    <v-card-title class="pb-3">Yeni Sayfa Olustur</v-card-title>
    <v-divider></v-divider>
    <v-form v-model="loginForm.valid" class="px-10 pt-2">
      <v-row>
        <v-col cols="6">
          <v-text-field class="flag-TR" ref="name" v-model="name" :rules="[() => !!name || 'This field is required']"
                        label="Baslik TR" prepend-icon="mdi-flag-checkered" placeholder="Turkce baslik giriniz" required
                        outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field class="flag-EN" ref="name" v-model="name" :rules="[() => !!name || 'This field is required']"
                        label="Baslik EN" prepend-icon="mdi-flag-checkered" placeholder="Ingilizce baslik giriniz"
                        required outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-combobox class="flag-TR" ref="name" v-model="model" :rules="[() => !!model || 'This field is required']"
                      label="Keywords TR" prepend-icon="mdi-flag-checkered" placeholder="Turkce keywords giriniz"
                      required multiple small-chips hide-selected :filter="filter" :hide-no-data="!search"
                      :items="items" :search-input.sync="search" outlined>
            <template v-slot:no-data>
              <v-list-item>
                <span class="subheading">Ekle</span>
                <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>{{ search }}</v-chip>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`"
                      :input-value="selected" label small>
                <span class="pr-2">
                  {{ item.text }}
                </span>
                <v-icon small @click="parent.selectItem(item)" color="red">mdi-close</v-icon>
              </v-chip>
            </template>
            <template v-slot:item="{ index, item }">
              <v-text-field v-if="editing === item" v-model="editing.text" autofocus flat background-color="transparent"
                            hide-details solo @keyup.enter="edit(index, item)"></v-text-field>
              <v-chip v-else :color="`${item.color} lighten-3`" dark label small>{{ item.text }}</v-chip>
              <v-spacer></v-spacer>
              <v-list-item-action @click.stop>
                <v-btn icon @click.stop.prevent="edit(index, item)">
                  <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="6">
          <v-combobox class="flag-EN" ref="name" v-model="modelEN"
                      :rules="[() => !!modelEN || 'This field is required']" label="Keywords EN"
                      prepend-icon="mdi-flag-checkered" placeholder="Ingilizce keywords giriniz" required multiple
                      small-chips hide-selected :filter="filter" :hide-no-data="!search" :items="items"
                      :search-input.sync="search" outlined>
            <template v-slot:no-data>
              <v-list-item>
                <span class="subheading">Ekle</span>
                <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>{{ search }}</v-chip>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attrs, item, parent, selected }">
              <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`"
                      :input-value="selected" label small>
                <span class="pr-2">
                  {{ item.text }}
                </span>
                <v-icon small @click="parent.selectItem(item)" color="red">mdi-close</v-icon>
              </v-chip>
            </template>
            <template v-slot:item="{ index, item }">
              <v-text-field v-if="editing === item" v-model="editing.text" autofocus flat background-color="transparent"
                            hide-details solo @keyup.enter="edit(index, item)"></v-text-field>
              <v-chip v-else :color="`${item.color} lighten-3`" dark label small>{{ item.text }}</v-chip>
              <v-spacer></v-spacer>
              <v-list-item-action @click.stop>
                <v-btn icon @click.stop.prevent="edit(index, item)">
                  <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="6">
          <v-textarea class="flag-TR" counter v-model="name" :rules="[() => !!name || 'This field is required']"
                      label="Ozet TR" prepend-icon="mdi-flag-checkered" placeholder="Turkce ozet giriniz" required
                      outlined></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-textarea class="flag-EN" counter v-model="name" :rules="[() => !!name || 'This field is required']"
                      label="Ozet EN" prepend-icon="mdi-flag-checkered" placeholder="Ingilizce ozet giriniz" required
                      outlined></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field ref="name" v-model="name" :rules="[() => !!name || 'This field is required']"
                        label="Sayfa Yonlendirme" placeholder="https://" required outlined></v-text-field>
        </v-col>
        <v-col cols="6">
          <label class="custom-label flag-TR">Icerik TR &nbsp;
            <v-icon>mdi-flag-checkered</v-icon>
          </label>
          <ckeditor :editor="editor" v-model="data"></ckeditor>
        </v-col>
        <v-col cols="6">
          <label class="custom-label flag-EN">Icerik EN &nbsp;
            <v-icon>mdi-flag-checkered</v-icon>
          </label>
          <ckeditor :editor="editor" v-model="data"></ckeditor>
        </v-col>
        <v-col cols="12">
          <label class="custom-label flag-EN">Resim yukle</label>
          <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                        vdropzone-removed-file="onRemoveUploadingFile"></vue-dropzone>
        </v-col>
        <v-col cols="6">
          <v-select :items="itemsD" label="Sayfa Ozelligi" outlined dense></v-select>
        </v-col>
        <v-col cols="6">
          <v-select :items="itemsD" label="Ust Sayfalar" outlined dense></v-select>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="6">
              <v-checkbox v-model="checkbox1" label="Ust menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
            <v-col cols="6">
              <v-checkbox v-model="checkbox2" label="Alt menude gozuksun" class="mt-0"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6"></v-col>
        <v-col cols="2" class="px-7 py-0">
          <v-btn class="login-btn" color="success" @click="login" :loading="loading" :disabled="loading">Kaydet
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

export default {
  name: "Create",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      editor: ClassicEditor,
      data: null,
      activator: null,
      attach: null,
      editing: null,
      search: null,
      menu: false,
      checkbox1: false,
      checkbox2: false,
      editingIndex: -1,
      nonce: 1,
      x: 0,
      y: 0,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      items: [
        {header: 'Select an option or create one'},
        {
          text: 'turkce',
          color: 'blue',
        },
        {
          text: 'english',
          color: 'cyan',
        },
        {
          text: 'Bar',
          color: 'red',
        },
      ],
      model: [
        {
          text: 'turkce',
          color: 'blue',
        },
      ],
      modelEN: [
        {
          text: 'english',
          color: 'blue',
        },
      ],
      itemsD: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"}
      },
      loginForm: {
        valid: false,
        email: '',
        password: '',
        emailRules: [v => !!v || 'Email is required'],
        passwordRules: [v => !!v || 'Password is required',],
      },
    }
  },
  watch: {
    model(val, prev) {
      if (val.length === prev.length) return
      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }
          this.items.push(v)
          this.nonce++
        }
        return v
      })
    },
    modelEN(val, prev) {
      if (val.length === prev.length) return
      this.modelEN = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }
          this.items.push(v)
          this.nonce++
        }
        return v
      })
    },
  },
  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false
      const hasValue = val => val != null ? val : ''
      const text = hasValue(itemText)
      const query = hasValue(queryText)
      return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
    },
  },
}
</script>

<style scoped>
</style>

