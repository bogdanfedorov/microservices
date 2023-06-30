import NotifyController from './controller'
import express from 'express'
import { Port } from '../config'
import { asyncRout } from '../helpers/asyncHandler'
import bodyParser from 'body-parser'
import schedule from 'node-schedule'

const app = express()
app.use(bodyParser.json())

const notifyController = new NotifyController()

app.post(
  '/deferredNotification',
  asyncRout((req) => notifyController.createSchedule(req.body)),
)

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}.`)
})

process.on('SIGINT', function () {
  schedule.gracefulShutdown().then(() => process.exit(0))
})
