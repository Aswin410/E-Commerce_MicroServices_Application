const express = require("express");
const cors = require("cors");

// Constants
const PORT = 8001;
const HOST = "0.0.0.0";

// App
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
