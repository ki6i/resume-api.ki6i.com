import config from './config';
import * as express from 'express';
const app = express();

app.get('/health-check', function (req, res) {
  res.send('ok')
})

app.get('*', function (req, res) {
  res.send('Hello World!')
})

app.listen(80, function () {
  console.log(`App ready!`)
})
