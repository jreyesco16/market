const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()



function messages(req, res) {

    const messages_vue = new Vue({
        data: {
            url: req.url
        },
        // MUST add a template
        template: require('fs').readFileSync('./html/messages.html','utf-8')
    })

    renderer.renderToString(messages_vue, (err, html) => {
        if (err) {
            res.status(500).end("Internal Server Error")
            return
        }

        res.end(html)
    })
}

module.exports.messages = messages