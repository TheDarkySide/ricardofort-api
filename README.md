# 🎩 Ricardo Fort API (Premium)

[ricardofortapi](https://fortapi.lfnetwork.net) es una API JSON gratuita, moderna y de alto rendimiento para obtener las mejores frases de **Ricardo Fort**. Curada cuidadosamente para preservar el legado del Comandante.

## 🚀 Arquitectura y Hosting
Esta API está construida sobre tecnología de vanguardia:
- **Cloudflare Workers:** Alojada directamente en el "Edge", lo que garantiza tiempos de respuesta mínimos desde cualquier parte del mundo.
- **Hono:** Un framework web ultra rápido construido para Cloudflare Workers.
- **Sin Dependencias Pesadas:** Mantenemos la API ligera y eficiente.
- **CORS Habilitado:** Lista para ser consumida desde cualquier cliente frontend.

## 🛠️ Uso y Endpoints

### 🎲 Obtener Frase Aleatoria
Recupera una frase al azar en formato JSON.
```http
GET /quotes
```
- `count`: Número de frases a devolver (máx: total en base de datos).
  `GET /quotes?count=5`
- `exclude`: IDs separados por comas para excluir de la selección. Útil para evitar repeticiones.
  `GET /quotes?exclude=id1,id2`

### 🔍 Buscar Frases
Filtra por palabras clave en el texto de la frase.
```http
GET /quotes/search?query=mama
```

### 📦 Obtener Todo
Devuelve la colección completa de frases.
```http
GET /quotes/all
```

---

## 💎 Ejemplo de Respuesta (JSON)
Ahora todas las frases incluyen su origen y URL verificado:

```json
{
    "id": "b526b60c-57e3-4425-b6ac-95e87836097e",
    "value": "MAMÁ, ¡CORTASTE TODA LA LOOZ!",
    "author": "Ricardo Fort",
    "origin": "FortNightShow (América TV)",
    "url": "https://www.youtube.com/watch?v=mCO_9BDTfaY"
}
```

> [!IMPORTANT]
> **Veracidad de los datos:** Cada frase en esta API debe pasar un proceso de chequeo manual. Debe tener un origen comprobable y, de ser posible, una URL a la fuente original (YouTube, Twitter, etc.). No se permiten frases inventadas o de dudosa procedencia.

---

## 🗺️ Roadmap / Objetivos a Futuro
- [x] **Migración a TypeScript:** Para mayor robustez y mejor DX.
- [ ] **Objetivo 365 Frases:** Una frase icónica para cada día del año (😎).
- [ ] **Expandir Endpoints:** Añadir nuevos Endpoints para mejorar el filtrado.
- [ ] **Sistema de Colaboración:** Implementar una forma de sugerir/verificar frases de forma colaborativa.
- [x] **Optimización del Azar:** Implementado algoritmo Fisher-Yates y soporte para parámetro `exclude` (shuffling inteligente).
- [ ] **Comandante en GIFs:** Ampliar la API para servir GIFs icónicos asociados al Comandante.
- [ ] **PostgreSQL (D1):** Migrar de un archivo JSON a una base de datos relacional.

---

## 🙏 Agradecimientos
Un agradecimiento profundamente a **Fausto Gabini** (`fausgabini`), el autor del repositorio original, sobre el cual se construyó esta versión. Su trabajo inicial fue la semilla que permitió que el legado del Comandante viviera en el código.

---

*Hecho con elegancia. El Comandante no se fue, se convirtió en código.*
