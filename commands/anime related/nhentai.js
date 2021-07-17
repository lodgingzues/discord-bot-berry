const API = require('kasu.nhentaiapi.js')
const api = new API()

module.exports = {
    commands: ['nh', 'nhentai'],
    callback: async (message, args, text, Discord) =>{
        if(!message.channel.nsfw) return message.channel.send('Channel is not nsfw')
        if(!args[0]) return console.log(await api.pRandom(data =>{
            sendEmbed(data)
        }))
        const ID = args[0]
        console.log(ID)
        if(args[1]){
            let imageIndex = args[1]
            message.channel.send(
                api.getID(ID).list(data =>{
                    message.channel.send(data.page_pics[imageIndex - 1])
                })
            )
        }else{
            api.getID(ID).list(data =>{
                sendEmbed(data)
            })
        }

        function sendEmbed(data){
            let embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(data.title_original)
                .setURL(data.url)
                .setThumbnail(data.cover)
                .addFields(
                    {name: 'Title', value: data.title, inline: true},
                    {name: 'Artist', value: data.artist, inline: true},
                    {name: 'Category', value: data.category, inline: true},
                    {name: 'Tags', value: data.tags, inline: true},
                    {name: 'Characters', value: data.characters, inline: true},
                    {name: 'Pages', value: data.pages, inline: true},
                    {name: 'Language', value: data.language, inline: true},
                    {name: 'Upload Date', value: data.uploaded, inline: true},
                    {name: 'ID', value: data.id, inline: true},
                )
                .setFooter("Requested by:" + message.author.tag)
    
                message.channel.send(embed)
        }
    }
}