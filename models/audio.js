const audioUrl = require('ytdl-core')


async function audio(url){
    try {
        let data = await audioUrl.getInfo(url)
        return data.formats.filter(aud=>aud.audioQuality=="AUDIO_QUALITY_MEDIUM")[1].url
    } catch (error) {
        return error.message
    }
}



module.exports = audio