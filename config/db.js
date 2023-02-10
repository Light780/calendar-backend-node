import mongoose from 'mongoose'
export const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DB_CNN, {
      autoIndex: true
    })
    console.log('DB Online')
  } catch (error) {
    console.log(error)
    throw new Error('Error al conectar a mongoDb')
  }
}
