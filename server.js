const express = require('express')

const connectDB = require('./config/db.js')
const app = express()

connectDB()
app.get('/', (req, res) => res.send('API running'))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
