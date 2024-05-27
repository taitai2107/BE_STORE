const express = require("express");
const app = express();
require("dotenv").config();
const useCORS = require("./src/config/CORS");
// require("express-async-errors");
const useRouter = require("./src/router/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 5000;
useCORS.configCORS(app);
useRouter.useRouter(app);
app.listen(PORT, () => {
  console.log(`sever is running on ${PORT}`);
});
