import express, { Application } from "express";
import loaders from "./loaders";
import { HOST, PORT } from "@configs";

const createApp = async () => {
  const app: Application = express();

  await loaders({ app });

  app.listen(PORT, HOST, () => {
    console.log(`Server has been launch and accessible on http://${HOST}:${PORT}`);
  });
};


export default createApp;

