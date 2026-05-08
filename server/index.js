import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/fragments/random', (req, res) => {
  const limit = Number(req.query.limit || 3)

  const rows = db
    .prepare(`
      SELECT id, title, text, category
      FROM fragments
      WHERE is_active = 1
      ORDER BY RANDOM()
      LIMIT ?
    `)
    .all(limit)

  res.json(rows)
})

app.post('/api/fragments', (req, res) => {
  const { title, text, category = 'misc' } = req.body

  if (!title || !text) {
    return res.status(400).json({
      message: 'title 和 text 不能为空',
    })
  }

  const result = db
    .prepare(`
      INSERT INTO fragments (title, text, category)
      VALUES (?, ?, ?)
    `)
    .run(title, text, category)

  res.json({
    id: result.lastInsertRowid,
    title,
    text,
    category,
  })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})