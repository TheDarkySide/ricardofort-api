import express, { Application } from "express";
import cors from "cors";
import quoteRoutes from "../routes/quote.ts";

class Server {
  private app: Application;
  private port: string | undefined;
  private quotesPath: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.quotesPath = "/quotes";

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.quotesPath, quoteRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

export default Server;
