const express = require("express");
const app = express();
const port = 5000;

// parse application/json
app.use(bodyParser.json());

app.get("/", async (req, res) => {});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
