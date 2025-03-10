import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";

const port = process.env.PORT || 3046;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
