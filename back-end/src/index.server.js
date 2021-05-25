const express = require('express')
const env = require('dotenv')
const app = express()
const mongoose = require('mongoose')

//routres
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
//environment variables
env.config()

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.h9q2p.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('Database connected')
  })

app.use(express.json())
app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)

app.post('/data', (req, res, next) => {
  res.status(200).json({
    message: req.body,
  })
})
app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Hello from server',
  })
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
