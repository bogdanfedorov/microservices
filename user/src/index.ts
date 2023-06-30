import express from 'express'
import bodyParser from 'body-parser'
import { Port } from '../config'
import { asyncRout } from '../helpers/asyncHandler'
import UserController from './controller'

const app = express()
app.use(bodyParser.json())

const userController = new UserController()
app.post(
  '/users/:id',
  asyncRout((req) => userController.getById(req.params.id)),
)

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}.`)
})
