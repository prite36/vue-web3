<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <h3>Block number {{blockNumber}}</h3>
    <h3>Network Type {{networkType}}</h3>

    <input v-model="ethAddress" placeholder="Enter ethAddress">
    <button v-on:click="getTransactionsHistory">Search</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      blockNumber: null,
      networkType: null,
      ethAddress: null,
      history: null
    }
  },
  beforeMount() {
   let vm = this
   setInterval(async () => {
     let { data } = await axios.get('http://localhost:3001/ethBlock')
     vm.blockNumber = data.blockNumber
     vm.networkType = data.networkType
   }, 3000)
   
 },
 methods: {
   async getTransactionsHistory() {
     let { data } = await axios.get(`http://localhost:3001/transactionsHistory/${this.ethAddress}`)
     this.history = data
   }
 } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
