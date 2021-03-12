const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()



function messages(req, res) {

    // VUE INITIALIZATION
    const vue = new Vue({
        data: {
            url: req.url,
            messages : ''
        },
        // MUST add a template
        template: require('fs').readFileSync('./html/messages.html','utf-8')
    })

    console.log(vue._data.messages) 
    // VUE CONFIG
    vue._data.messages = getUserMessages()

    // render the html file with vue components
    renderer.renderToString(vue, (err, html) => {
        if (err) {
            res.status(500).end("Internal Server Error")
            return
        }

        res.end(html)
    })
}

function getUserMessages(){

    return {Hello : "Hello"}

}

module.exports.messages = messages