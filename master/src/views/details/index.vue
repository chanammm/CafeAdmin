<template lang="pug">
.container
  iframe(:src="path")
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      path: 'http://192.168.0.168:8080/cafeadmin/client/templates/build/details.html?workId=2020081900005'
    }
  },
  methods: {
    submit () {
      this.$router.push('order')
    }
  },
  created () {}
}
</script>

<style lang="scss">
    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>
