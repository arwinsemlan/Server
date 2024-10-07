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

export async function getNotes(token) {
    const [rows] = await pool.query(`
    SELECT * FROM notes
    WHERE token = ?
    `, [token])
    return rows
}

export async function saveNote(content, title, token) {
    const [result] = await pool.query(`
    UPDATE notes
    SET contents = ?
    WHERE id = ?
    AND token = ?
    `, [content, title, token])
    return result
}

export async function getNote(token, title) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE token = ?
    AND title = ?
    `, [token, title])
    return rows
}

export async function getUser(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM login
    WHERE id = ?
    `, [id])
    return rows[0]
}

export async function createNote(title, content, token) {
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents, token)
    VALUES (?,?,?)
    `, [title, content, token])
    return result.insertId
}

export async function login(user, password) {
    const [result] = await pool.query(`
    SELECT * from login 
    WHERE username = ? 
    AND password = ?
    `, [createHash('sha256').update(user).digest('hex'), createHash('sha256').update(password).digest('hex')])
    return result
}

export async function createLogin(user, password) {
    const [result] = await pool.query(`
    INSERT INTO login(username, password, token)
    VALUES (?, ?, ?)
    `, [createHash('sha256').update(user).digest('hex'),
    createHash('sha256').update(password).digest('hex'),
    randomBytes(16).toString('hex')])
    return result
}