import express from 'express'
import bodyParser from 'body-parser'
import { Port } from '../config'
import { asyncRout } from '../helpers/asyncHandler'
import ManagerController from './controller'

const app = express()
app.use(bodyParser.json())

const managerController = new ManagerController()

app.post(
  '/event',
  asyncRout((req) => managerController.createRedirection(req.body)),
)

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}.`)
})
