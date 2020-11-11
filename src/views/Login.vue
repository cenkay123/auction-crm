<template>
  <v-main>
    <v-navigation-drawer app class="login-left">
      <div class="mt-3 mt-md-15 pa-13">
        <div class="display-1 text-center primary--text">Online Muzayede</div>
        <div class="title my-2 text-sm-body-1 text-center">Hoş geldiniz! Birlikte harika şeyler inşa edelim.</div>
        <a class="my-4 v-btn v-btn--contained v-btn--router theme--light v-size--default d-flex">
          <span class="v-btn__content">Fiyatlandirma</span>
        </a>
      </div>
      <img src="https://lux-admin-pro.indielayer.com/images/illustrations/signin-illustration.svg">
    </v-navigation-drawer>
    <v-container fluid class="login-bg">
      <div class="login-area">
        <v-card class="mx-auto my-12" max-width="400">
          <v-img height="100" src="https://travibot.com/en/wp-content/uploads/2019/08/auction-520x245.jpg"></v-img>
          <v-card-title class="login-title pb-0">Welcome</v-card-title>
          <v-card-text>
            <div class="subtitle-1 justify-center text-center">Sign in your account</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-form v-model="loginForm.valid">
            <v-row>
              <v-col cols="12" class="px-7 py-0 pt-3">
                <v-text-field label="Email" class="login-input" outlined v-model="loginForm.email" required
                              :rules="loginForm.emailRules"></v-text-field>
              </v-col>
              <v-col cols="12" class="px-7 py-0">
                <v-text-field label="Password" type="password" class="login-input" outlined v-model="loginForm.password"
                              required :rules="loginForm.passwordRules"></v-text-field>
              </v-col>
              <v-col cols="12" class="px-7 py-0">
                <v-btn class="login-btn" color="success" @click="login" :loading="loading"
                       :disabled="loading">Login
                  <template v-slot:loader>
                    <span>Loading...</span>
                  </template>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </div>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout">{{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">Kapat</v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        valid: false,
        email: '',
        password: '',
        emailRules: [v => !!v || 'Email is required'],
        passwordRules: [v => !!v || 'Password is required',],
      },
      snackbar: false,
      text: 'Kullanici adi veya parola yanlis.',
      timeout: 2000,
      loading: false
    }
  },
  methods: {
    login() {
      this.loading = true;
      this.api_post('/login', {
        Email: this.loginForm.email,
        Password: this.loginForm.password
      }, this.successLogin, this.errorLogin)
    },
    successLogin(response) {
      this.loading = false;
      this.$store.commit('login', response);
      this.$router.push({name: 'Dashboard'});
      window.location.reload();
    },
    errorLogin() {
      this.loading = false;
      this.snackbar = true
    }
  }
}
</script>

<style scoped>

</style>
