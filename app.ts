import dotenv from "dotenv";
import Server from "./models/server.ts";

dotenv.config();

const server = new Server();

server.listen();
