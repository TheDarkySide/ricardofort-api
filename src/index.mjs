import { Hono } from 'hono'
import { cors } from 'hono/cors'
import quotes from '../quotes.json'

const app = new Hono()

// Middleware de CORS
app.use('*', cors())

// 🎲 Ruta: Frase Aleatoria (+ soporte count)
app.get('/quotes', (c) => {
  const count = parseInt(c.req.query('count')) || 1
  
  if (count <= 1) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    return c.json(randomQuote)
  }

  // Shuffle y seleccionamos múltiples
  const shuffled = [...quotes].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, Math.min(count, quotes.length))
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

// Nota: Las peticiones a la raíz (/) y otros estáticos serán manejados 
// por Cloudflare Assets si no se definen aquí las rutas.

export default app
