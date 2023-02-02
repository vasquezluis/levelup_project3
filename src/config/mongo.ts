import "dotenv/config";
import { connect } from "mongoose";

async function dbConnect(): Promise<void> {
  const MONGO_URI = <string>process.env.DB_URI;
  await connect(MONGO_URI);
}

export default dbConnect;
