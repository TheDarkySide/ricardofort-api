import { Router } from "express";
import {
  quoteGet,
  searchQuotes,
  allQuotesGet,
} from "../controllers/quote.ts";

const router = Router();

router.get("/", quoteGet);

router.get("/search", searchQuotes);

// All quotes
router.get("/all", allQuotesGet);

export default router;
