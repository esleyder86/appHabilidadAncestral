<template>
  <div id="dashboard">
    <h3>Planta medicinal</h3>
    <router-link to="/new" class="btn btn-success btn-md pull-right">
      Nueva planta
    </router-link>
    <br>
    <br>
    <div class="card-deck">
      <div v-for="medicinalPlant in medicinalPlants" v-bind:key="medicinalPlant.id">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" :src="medicinalPlant.photo" :alt="medicinalPlant.name">
          <div class="card-body">
            <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
            <h5 class="card-title info">{{medicinalPlant.name}}</h5>
            <p class="card-text info" @click="getClasification(medicinalPlant.clasification)"><span class="gray">Clasificación: </span> {{medicinalPlant.clasificationName}}</p>
          </div>
        </div>
      </div>
    </div>

    <div id="infoClasificationFloating" v-if="clasificationPlantExist" @click="hideInfoClasification()">
      <h2>{{this.clasificationPlant[0].name}}</h2>
      <p>{{this.clasificationPlant[0].description}}</p>
      <span class="gray">¿Para que sirve?</span>
      <p>{{this.clasificationPlant[0].utility}}</p>
      <span class="gray">Ejemplos:</span>
      <p>{{this.clasificationPlant[0].example}}</p>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'

  export default {
    name: 'dashboard',
    data() {
      return {

        medicinalPlants: [],
        clasificationPlant: [],
        clasificationPlantExist: false,
      }
    },
    created() {
      db.collection('medicinalPlant').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'name': doc.data().name,
            'photo': doc.data().photo,
            'preparation': doc.data().preparation,
            'clasification': doc.data().clasificationId,
            'clasificationName': doc.data().clasificationName
          }
          this.medicinalPlants.push(data)
        })
      })
    },
    methods: {
      hideInfoClasification() {
        this.clasificationPlantExist = false
      },
      getClasification(clasification) {
        this.clasificationPlant = []
        if (clasification !== null) {
          let ref = db.collection('clasification').doc(clasification)
          ref.get()
            .then(snapshot => {  //DocSnapshot
              if (snapshot.exists) {
                this.clasificationPlantExist = true
                this.clasificationPlant.push(snapshot.data())
                console.log(this.clasificationPlant)
              } else {
                // snapshot.data() will be undefined in this case
                console.log("No such document!");
              }
            })
        }



      }
    }
  }
</script>

<style lang="css">
  span.badge.badge-pill.badge-light.email {
    position: relative;
    top: 8px;
  }


  .card-img-top {
    width: 100%;
    border-top-left-radius: calc(.25rem - 1px);
    border-top-right-radius: calc(.25rem - 1px);
    height: 12em !IMPORTANT;
  }

  div#navbar {
    background: #66a557 !IMPORTANT;
  }
  div#infoClasificationFloating {
    position: fixed;
    top: 15%;
    right: 3%;
    background: white;
    width: 25%;
    padding: 5px 14px;
    border-radius: 10px;
  }
  h5.card-title.info {
    text-align: center;
    font-size: 1.6em;
    color: #67a259;
    font-weight: bold;
    font-family: monospace;
    text-transform: capitalize;
  }
  p.card-text.info span {
    color: gray;
    font-weight: normal;
    font-size: 13px !important;
  }
  p.card-text.info {
    text-align: center;
    width: 50%;
    margin: auto;
  }


  p.card-text.info {
    text-align: center;
    width: 50%;
    margin: auto;
    text-transform: capitalize;
    cursor: pointer;
  }
  p.card-text.info:hover {
    color: #37510d;
  }
</style>
