const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()



function messages(req, res) {

    // VUE INITIALIZATION
    const vue = new Vue({
        data: {
            url: req.url,
            messages : getUserMessages()
        },
        // MUST add a template
        template: require('fs').readFileSync('./html/messages.html','utf-8')
    })

    // VUE CONFIG
    vue.data = getUserMessages()

    // render the html file with vue components
    renderer.renderToString(messages_vue, (err, html) => {
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