(function(){
    let js = [
        {g: 'script', len: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js'},
        {g: 'script', len: 'https://cdn.jsdelivr.net/npm/vant@2.8/lib/vant.min.js'}
    ];
    js.map(element => {
        type(element)
    })
    function type(params) {
        let js = document.createElement(params.g);
        js.setAttribute('src', params.len);
        document.head.appendChild(js);
    }
})()