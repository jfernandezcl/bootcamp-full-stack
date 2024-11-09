const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./routes/blogs')

const app = express()

const mongooseUrl = 'mongodb+srv://jfernandez:Harley-iron-883@cluster0.rilsr.mongodb.net/admin?retryWrites=true&loadBalanced=false&replicaSet=atlas-7d1pj3-shard-0&readPreference=primary&srvServiceName=mongodb&connectTimeoutMS=10000&w=majority&authSource=admin&authMechanism=SCRAM-SHA-1'
mongoose.connect(mongooseUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app