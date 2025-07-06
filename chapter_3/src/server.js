import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 5003

// Get the file path from the URL of the current module

const __filename = fileURLToPath(import.meta.url)

//get the directory name from the file path
const __dirname = dirname(__filename)

//Middleware
app.use(express.json())

//serves the html file from the public directory
// tells the express to serve all files from the public folder as static assets file
// any requests for the css files will be resolved to the public directory.

app.use(express.static(path.join(__dirname, '../public')))


//Routes
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

//serving up the html file from the public file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})