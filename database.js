import mysql from "mysql2"

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows
}

async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ?
    `, [id])
    return rows[0]
}

async function createNote(title, content) {
    const [result] =await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?,?)
    `, [title, content])
    return result.insertId
}

const result = await createNote('Second note by me - arwin', 'A note about me')
console.log(result)