const express = require('express')

const connectDB = require('./config/db.js')
const app = express()

connectDB()
app.use(express.json()) //used to parse json request instead of body-parser

app.get('/', (req, res) => res.send('API running'))

app.use('/api/users', require('./routes/users'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
