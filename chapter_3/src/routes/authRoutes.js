import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../db.js"

const router = express.Router()

//Register a new user endpoint /auth/register
router.post('/register', (req, res) => {
    const { username, password } = req.body

    // Check if the username already exists
    const checkUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
    const existingUser = checkUser.get(username)

    if (existingUser) {
        res.status(400).json({ error: 'Username already exists' })
        return
    }

    // encrypt the hashed password
    const hashedpassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to db 
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedpassword)

        // Get the ID of the newly created user
        const userId = result.lastInsertRowid

        // Check if the user was created successfully
        const checkUser = db.prepare(`SELECT * FROM users WHERE id = ?`)
        const user = checkUser.get(userId)

        if (!user) {
            res.status(500).json({ error: 'Failed to create user' })
            return
        }
        // now that we have a user, I want a default todo for them

        const defaultTodo = `Hello :) Add your first todo`
        console.log('userId:', userId)
        console.log('defaultTodo:', defaultTodo)
        try {
            const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
            insertTodo.run(userId, defaultTodo)
        } catch (err) {
            console.log(err.message)
            console.log(err)
            res.status(500).json({ error: 'Failed to create default todo' })
            return
        }
        // create a token

        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login', (req, res) => {

})

export default router