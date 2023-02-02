import "dotenv/config";
import app from "./app";
import db from "./config/mongo";

const port = process.env.PORT || 3000;

// check connection
db().then(() => {
  console.log("mongodb connectd");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
