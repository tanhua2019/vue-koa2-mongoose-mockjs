<template>
  <div class="ErrorBox"></div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },

  methods: {}
};
</script>
<style lang="less" scoped>
.ErrorBox {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: url(../assets/images/404.gif) no-repeat;
  background-size: 100% 100%;
}
</style>
