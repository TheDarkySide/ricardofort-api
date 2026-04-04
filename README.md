# 🎩 Ricardo Fort API (Premium)

[ricardofortapi](https://ricardofort-api.onrender.com) es una API JSON gratuita, moderna y de alto rendimiento para obtener las mejores frases de **Ricardo Fort**. Curada cuidadosamente para preservar el legado del Comandante.

🚀 **Nuevas mejoras:**
- **Landing Page Stunning:** Visita la raíz de la API para ver la mística documentación interactiva.
- **Soporte Multi-Random:** Obtén varias frases aleatorias a la vez usando `?count=X`.
- **Base de datos expandida:** Ahora con 50+ frases (sincronizadas con svelte-hub).

---

## 🛠️ Uso y Endpoints

### 🎲 Obtener Frase Aleatoria
Recupera una frase al azar en formato JSON.
```http
GET /quotes
```
**Parámetros opcionales:**
- `count`: Número de frases a devolver (máx: total en base de datos).
  `GET /quotes?count=5`

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

```json
{
    "id": "b526b60c-57e3-4425-b6ac-95e87836097e",
    "value": "MAMÁ, ¡CORTASTE TODA LA LOOZ!",
    "author": "Ricardo Fort"
}
```

---

*Hecho con elegancia. El Comandante no se fue, se convirtió en código.*