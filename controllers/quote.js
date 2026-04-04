const { response } = require("express");
const quotes = require("../quotes.json");

const quoteGet = (req, res = response) => {
  const count = parseInt(req.query.count) || 1;

  if (count <= 1) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return res.json(randomQuote);
  }

  // Shuffle and pick multiple
  const shuffled = [...quotes].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, quotes.length));

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
