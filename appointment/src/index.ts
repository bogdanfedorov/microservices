import express from 'express'
import * as mongoose from 'mongoose'
import { MongodbConnectionUrl, Port } from '../config'
import { asyncRout } from '../helpers/asyncHandler'
import AppointmentController from './controller'
import { FilterAppointment } from './interfaces'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())
const appointmentController = new AppointmentController()

app.post(
  '/appointment',
  asyncRout((req) => appointmentController.create(req.body)),
)

app.get(
  '/appointment',
  asyncRout((req) => appointmentController.getByFilter(req.query as FilterAppointment)),
)

mongoose
  .connect(MongodbConnectionUrl)
  .then(() => {
    console.debug('Successfully connected to the database')
    app.listen(Port, () => {
      console.debug(`Server is running on port ${Port}.`)
    })
  })
  .catch((err) => {
    console.debug('Could not connect to the database. Exiting now...', err)
  })
