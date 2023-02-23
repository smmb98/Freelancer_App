import { AppDataSource } from "./data-source";
import { app } from "./app";

async function main() {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await AppDataSource.initialize();
    console.log("\nConnected to PostgreSQL Database.\n");

    app.listen(process.env.PORT, () => {
      console.log("Server listening on http://localhost:" + process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
