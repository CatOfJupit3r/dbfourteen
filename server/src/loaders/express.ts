import { Application } from "express";

const setupExpress = async ({ app }: { app: Application }) => {
  app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
  });
}

export default setupExpress;