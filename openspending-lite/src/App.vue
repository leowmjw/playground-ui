<style>
  /* Global Style here ... */

</style>

<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <div>
      <popit></popit>
      <popit mytype="organization"></popit>
    </div>
    <div>
      <popit mytype="membership"></popit>
      <popit mytype="post"></popit>
    </div>
    <div v-for="n in 10">
      <h2>{{ n }} =====> </h2><popit :pnum=n></popit>
    </div>
  </div>
</template>

<script>
  import PopIt from './components/PopIt.vue'

export default {
  components: {
    popit: PopIt
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!'
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
