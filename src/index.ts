import { Hono } from 'hono'
import { cors } from 'hono/cors'
import quotesData from '../quotes.json'
import { Quote } from './types'

const quotes = quotesData as Quote[]
const app = new Hono()

// Middleware de CORS
app.use('*', cors())

// Fisher-Yates Shuffle para una aleatoriedad uniforme (Premium)
const shuffle = (array: Quote[]): Quote[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// 🎲 Ruta: Frase Aleatoria (+ soporte count y exclude)
app.get('/quotes', (c) => {
  const count = parseInt(c.req.query('count') || '1') || 1
  const exclude = c.req.query('exclude')?.split(',') || []

  // Filtramos las frases que el usuario ya vio
  let availableQuotes = quotes.filter(q => !exclude.includes(q.id))

  // Si se excluyeron todas, reiniciamos la lista para evitar errores
  if (availableQuotes.length === 0) availableQuotes = quotes

  if (count <= 1) {
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)]
    return c.json(randomQuote)
  }

  // Shuffle real y seleccionamos múltiples
  const shuffled = shuffle(availableQuotes)
  const selected = shuffled.slice(0, Math.min(count, availableQuotes.length))
  return c.json(selected)
})

// 🔍 Ruta: Búsqueda
app.get('/quotes/search', (c) => {
  const query = c.req.query('query')?.toLowerCase() || ""
  const filtered = quotes.filter(q => q.value.toLowerCase().includes(query))
  
  if (filtered.length === 0) {
    return c.json({ msg: "No hay frases que coincidan con la búsqueda." }, 404)
  }
  
  return c.json({
    total: filtered.length,
    result: filtered
  })
})

// 📦 Ruta: Todas
app.get('/quotes/all', (c) => {
  return c.json({
    total: quotes.length,
    result: quotes
  })
})

export default app
