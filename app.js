const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()



const authRoutes = require("./src/controllers/auth");
const categoryRoutes = require("./src/controllers/category");
const productRoutes = require("./src/controllers/product");

const app = express()

app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_ATLAS)
  .then(() => console.log('Database connected!')).catch(err => console.log(err))

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
