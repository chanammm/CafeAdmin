<template lang="pug">
    mixin article(title)
        .article
            .article-wrapper
            h1= title
            if block
                block
            else
                p 没有提供任何内容。
    +article('Hello world')
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      code: 123
    }
  },
  methods: {},
  created () {}
}
</script>
