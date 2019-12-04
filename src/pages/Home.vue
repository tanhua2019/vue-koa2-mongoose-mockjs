<template>
  <div class="box">
    {{ $store.state.count }}
    <div>
      <button @click="add(10)">增加</button>
      <button @click="reduce(10)">减少</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions(["actionsAdd", "actionsReduce"]),
    add(n) {
      console.log("dd");
      // this.$store.commit('mutationsAdd',n)
      // this.$store.dispatch('actionsAdd',n)
      this.actionsAdd(n);
    },
    reduce(n) {
      console.log("cc");
      // this.$store.commit('mutationsReduce',n)
      // this.$store.dispatch('actionsReduce',n)
      this.actionsReduce(n);
    }
  }
};
</script>
