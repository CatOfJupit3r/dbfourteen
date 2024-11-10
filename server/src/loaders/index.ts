import setupExpress from "./express";
import { Application } from "express";

export default async ( { app }: { app: Application}) => {
  console.log("Initializing loaders...");
  console.log("Setting up Express...");
  await setupExpress({ app });
  console.log("Express setup completed...");
  console.log("All loaders initialized...");
}