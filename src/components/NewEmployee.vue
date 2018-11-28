<template class="containerMain">
  <div id="new-employee">
    <br>
    <h4>Agregar planta medicinal</h4>
    <div class="card" style="width: 26rem; display: inline-block;vertical-align: top;">
      <div class="card-body">
        <form @submit.prevent="saveMedicinalPlant">

          <div class="form-group">
            <label>Nombre</label>
            <input placeholder="Nombre" type="text" class="form-control" v-model="name">
          </div>
          <div class="form-group">
            <label>Foto</label>
            <input placeholder="copia la url de la foto aquí" type="url" class="form-control" v-model="photo">
          </div>
          <div class="form-group">
            <label>Clasificación</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="clasification">

              <option v-for="clasification in clasifications" :value="clasification">{{clasification.name}}</option>

            </select>
          </div>
          <button type="submit" class="btn btn-md btn-success">Guardar</button>
          <router-link to="/" class="btn btn-md btn-secondary">Cancelar</router-link>
        </form>
      </div>
    </div>
    <img :src="this.photo" class="imgPreview" :title="this.name"/>
    <div id="infoClasification" v-if="clasification !== null">
      <h2>{{clasification.name}}</h2>
      <p>{{clasification.description}}</p>
      <span class="gray">¿Para que sirve?</span>
      <p>{{clasification.utility}}</p>
      <span class="gray">Ejemplos:</span>
      <p>{{clasification.example}}</p>
    </div>
  </div>

</template>

<script>

  import Multiselect from 'vue-multiselect'

  import db from './firebaseInit'

  export default {
    components: {Multiselect},
    name: 'new-employee',
    data() {
      return {
        name: null,
        photo: null,
        utility: null,
        clasification_id: null,
        preparation: null,
        value: null,
        clasifications: [],
        clasification: null,
        clasificationNames: [],
        clasificationName: null
      }
    },
    created() {
      db.collection('clasification').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc)
          const data = {
            'id': doc.id,
            'name': doc.data().name,
            'description': doc.data().description,
            'utility': doc.data().utility,
            'example': doc.data().example
          }
          this.clasifications.push(data)
          this.clasificationNames.push(data.name)
        })
      })
    },
    methods: {
      saveMedicinalPlant() {
        db.collection('medicinalPlant').add({
          name: this.name,
          photo: this.photo,
          clasificationId: this.clasification.id,
          clasificationName: this.clasification.name
        })
          .then(docRef => this.$router.push('/'))
          .catch(error =>
            console.log(error)
          )
      }// Save Employee method
    }// methods
  }
</script>

<style lang="css">
  img.imgPreview {
    height: 100%;
    display: inline-block;
    vertical-align: top;
    border-radius: 4px;
  }
  div#infoClasification {
    width: 23%;
    display: inline-block;
    margin: 0 1em;
  }
  div#infoClasification h2 {
    text-transform: capitalize;
  }
</style>
