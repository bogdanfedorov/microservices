import express from 'express'
import { Port } from '../config'
import { asyncRout } from '../helpers/asyncHandler'
import DoctorController from './controller'

const app = express()

const doctorController = new DoctorController()

app.get(
  '/doctors/:id',
  asyncRout((req) => doctorController.getById(req.params.id)),
)

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}.`)
})
