export const AppointmentApiURL = process.env.APPOINTMENT_API_URL || 'http://localhost:4000'
export const Port = process.env.PORT || 4001

export const DbName = process.env.DB_NAME || 'doctors'
export const MongodbConnectionUrl = `${
  process.env.MONGODB_CONNECTION_URL || 'mongodb://localhost:27017'
}/${DbName}`
