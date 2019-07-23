<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex mb-4>
        <img alt="eth logo" src="../assets/ethereum.svg" height="120">
        <br><br>
        <h2>Block number: {{blockNumber}}</h2>
        <br>
        <h2>Network Type: {{networkType}}</h2>

        <v-form v-model="valid">
          <v-text-field
                v-model="ethAddress"
                :rules="ethRules"
                label="ETH Address"
                required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            color="success"
            @click="getTransactionsHistory"
          >
          Search
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <v-container fluid grid-list-md>
    <v-data-iterator
      :items="transactionsHistory"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
    <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="light-green darken-2"
          dark
          flat
        >
          <v-toolbar-title>Transaction History</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear v-show="loading" :indeterminate="loading"></v-progress-linear>
        </template>
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg5
        >
          <v-card >
            <v-card-title><div class="text-truncate"><h4>Tx Hash {{ props.item.hash }}</h4></div></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>#Block:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.blockNumber }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>From:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.from }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>To:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.to }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Gas Limit:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.gas }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Gas Price:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.gasPrice }} Ether</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Nonce:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.nonce }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Timestamp:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ unixTimeToFormat(props.item.timestamp) }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
    </v-container>
  </v-container>
    
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'
export default {
  name: 'Homepage',
  props: {
    msg: String
  },
  data() {
    return {
      rowsPerPageItems: [2, 4, 6],
      pagination: {
        rowsPerPage: 2
      },
      valid: true,
      ethRules: [
        v => !!v || 'ETH address is required',
        v => /^0x[a-fA-F0-9]{40}$/.test(v) || 'ETH address must be valid'
      ],
      loading: false,
      blockNumber: null,
      networkType: null,
      ethAddress: null,
      transactionsHistory: []
    }
  },
  beforeMount() {
   let vm = this
   setInterval(async () => {
     let { data } = await axios.get('https://learn-web3.herokuapp.com/ethBlock')
     vm.blockNumber = data.blockNumber
     vm.networkType = data.networkType
   }, 3000)
   
 },
 methods: {
   async getTransactionsHistory() {
     this.loading = true
     let { data } = await axios.get(`https://learn-web3.herokuapp.com/transactionsHistory/${this.ethAddress}`)
     this.transactionsHistory = data
     this.loading = false
   },
   unixTimeToFormat (timestamp) {
     return moment.unix(timestamp).tz('Asia/Bangkok').format("DD/MM/YYYY LT")
   }
 } 
}
</script>
<style>
</style>
