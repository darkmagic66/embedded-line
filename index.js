console.log("ok")

// lib
const line = require('@line/bot-sdk')
const express = require('express')
const axios = require('axios').default
const dotenv = require('dotenv')

// use lib
const env = dotenv.config().parsed
const app = express()

//console.log(env)

const lineConfig = {
    channelAccessToken : env.CHANNEL_ACCESS_TOKEN ,
    channelSecret : env.CHANNEL_SECRET
}
//console.log(lineConfig.channelAccessToken)

const client = new line.Client(lineConfig)

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
    try{
        //console.log(req.body)
        const events = req.body.events
        console.log('events -> ', events)
        return  events.length > 0 ? await events.map(item => handleEvent(item)) : res.status(200).send("OK")
            
    } catch(error){
        res.status(500).end()
    }
})

const handleEvent = async (event) => {
    //console.log(event)
    return client.replyMessage(event.replyToken, {type:'text', text:'Test'})
}

app.listen(4000, () => {
    console.log("Listening port 4000")
})

