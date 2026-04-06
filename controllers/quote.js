const { response } = require("express");
const quotes = require("../quotes.json");

// Fisher-Yates Shuffle Algorithm (Premium)
const shuffleQuotes = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const quoteGet = (req, res = response) => {
  const count = parseInt(req.query.count) || 1;
  const exclude = req.query.exclude ? req.query.exclude.split(",") : [];

  // Filtrar frases excluidas para evitar repeticiones (Smart API)
  let filteredQuotes = quotes.filter((q) => !exclude.includes(q.id));

  // Si se excluyeron todas las frases, reiniciamos la lista para no dar error
  if (filteredQuotes.length === 0) {
    filteredQuotes = quotes;
  }

  // Si solo pide una frase
  if (count <= 1) {
    const randomQuote =
      filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    return res.json(randomQuote);
  }

  // Si pide múltiples frases, usamos Fisher-Yates para barajar
  const shuffled = shuffleQuotes(filteredQuotes);
  const selected = shuffled.slice(0, Math.min(count, filteredQuotes.length));

  res.json(selected);
};

const searchQuotes = (req, res = response) => {
  const query = req.query.query?.toLowerCase() || "";
  const filteredQuotes = quotes.filter((quote) =>
    quote.value.toLowerCase().includes(query)
  );

  if (filteredQuotes.length === 0) {
    return res.status(404).json({
      msg: "No hay frases que coincidan con la búsqueda.",
    });
  }

  res.json({
    total: filteredQuotes.length,
    result: filteredQuotes,
  });
};

const allQuotesGet = (req, res = response) => {
  res.json({
    total: quotes.length,
    result: quotes,
  });
};

module.exports = {
  quoteGet,
  searchQuotes,
  allQuotesGet,
};
