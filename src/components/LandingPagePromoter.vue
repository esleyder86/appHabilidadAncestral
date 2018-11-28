<template>
  <div id="dashboard">
    <h3>Planta medicinal</h3>
    <router-link to="/new" class="btn btn-success btn-md pull-right">
      Nueva planta
    </router-link>
    <br>
    <br>
    <div class="card-deck">
      <div v-for="staff in staffs" v-bind:key="staff.id">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top">
          <div class="card-body">
            <h5 class="card-title info">{{staff.first_name}}</h5>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'

  export default {
    name: 'dashboard',
    data() {
      return {
        staffs: [],
      }
    },
    created() {
      db.collection('staff').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'first_name': doc.data().first_name,
          }
          this.staffs.push(data)
        })
      })
    },
    methods: {
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
