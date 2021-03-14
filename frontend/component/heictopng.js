const heic2any = require("heic2any")


function heictopng(heic){


    return heic2any({
        blob: heic,
        toType: "image/png",
        quality: 0.5

    })
}

module.exports.heictopng = heictopng