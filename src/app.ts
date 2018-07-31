import config from './config'
import * as express from 'express'

import { isValidEmail,  sendAWSSES} from './emailHelper'

const JSON = require('circular-json');

const app = express()


app.get('/health-check', function (req, res) {
  res.send('ok')
})

async function sendEmail(email: string, from: string, content: string, res: express.Response) {
    if (!isValidEmail(email) || !isValidEmail(from) || !content) {
        res.status(400).json({
            error: 'Invalid email: ' + email + ' or ' + from + ' or content is empty',
        })
    }
    else {
        try {
            const responseData = await sendAWSSES(content, from)
            return res.json(responseData)
        }
        catch (error){
            return res.status(400).json({ error: JSON.stringify(error),})
        }
    }
}

app.get('/contact-me', function (req, res) {
    const email = req.query.email
    const from =  req.query.from
    const content = req.query.content
    sendEmail(email, from, content, res)
})

app.get('*', function (req, res) {
  res.send(JSON.stringify(req))
})

app.listen(config.port, function () {
  console.log(`App ready!`)
})
