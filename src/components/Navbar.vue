<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <router-link to="/" class="navbar-brand">Habilidad Ancestral</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">

          <li class="nav-item" v-if="isLoggedIn && currentPromotor">
            <router-link class="nav-link" to="/landingPagePromoter" title="takni"><i class="fa fa-home"></i> Inicio</router-link>
          </li>

          <li class="nav-item" v-if="isLoggedIn && !currentPromotor">
            <router-link class="nav-link" to="/landingPagePatient" title="takni"><i class="fa fa-home"></i> Inicio</router-link>
          </li>

          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login" title="nue'sx">Ingresar</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/register" title="nue'sx">Registrate</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn && !currentPromotor">
            <router-link class="nav-link" to="/registerPatient" title="nasa khauni"><i class="fa fa-user-plus"></i> Registrar paciente</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn && currentPromotor">
            <router-link class="nav-link" to="/registerStaff" title="nasa khauni"><i class="fa fa-user-plus"></i> Registrar personal</router-link>
          </li>

          <li v-if="isLoggedIn"><span class="badge badge-pill badge-light email">{{ currentUser }} | {{currentRole}}</span></li>

          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btnLogout" title="khaseni" @click="logout">Cerrar sesión <i class="fa fa-sign-out-alt"></i></button>
          </li>

        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'navbar',
    data() {
      return {
        isLoggedIn: false,
        currentUser: false,
        currentRole: false,
        currentPromotor: false
      }
    },
    created() {
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
        if(firebase.auth().currentUser.email === "linafea@gmail.com"){
          this.currentRole = "Paciente"
        }else{
          this.currentRole = "Promotor"
          this.currentPromotor = true
        }

      }
    },
    methods: {
      logout() {
        firebase.auth().signOut().then(() => {
          this.$router.go({path: this.$router.path});
        });
      }
    }
  }
</script>

<style scoped>
  .email {
    padding-top: 5px;
  }

  .badge-light {
    color: #feffff;
    background-color: #f8f9fa00;
  }
  span.badge.badge-pill.badge-light.email {
    position: relative;
    top: 8px;
    font-size: 14px !important;
    font-family: sans-serif;
    color: #e5f4e7;
    font-weight: normal !important;
  }
  button.btn.btnLogout {
    background: transparent;
    font-size: 15px !important;
    color: white;
    margin: 2px auto !important;
  }
</style>
