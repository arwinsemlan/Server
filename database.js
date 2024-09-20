import mysql from "mysql2"
import { createHash, randomBytes } from "crypto"
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
    const [rows] = await pool.query("SELECT * FROM notes")
    return rows
}

export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ?
    `, [id])
    return rows[0]
}

export async function getUser(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM login
    WHERE id = ?
    `, [id])
    return rows[0]
}

export async function createNote(title, content) {
    const [result] =await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?,?)
    `, [title, content])
    return result.insertId
}

export async function login(user, password) {
    const [result] = await pool.query(`
    SELECT * from login 
    WHERE user = ? 
    AND password = ?
    `, [createHash('sha256').update(user).digest('hex'), createHash('sha256').update(password).digest('hex')])
    return result
}

export async function creatLogin(user, password) {
    const [result] = await pool.query(`
    INSERT INTO login(user, password, token)
    VALUES (?, ?, ?)
    `, [createHash('sha256').update(user).digest('hex'),
        createHash('sha256').update(password).digest('hex'), 
        randomBytes(16).toString('hex')])
    return getUser(result.insertId)
}