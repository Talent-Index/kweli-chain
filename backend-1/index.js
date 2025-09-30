const express = require("express");
const certRoutes = require("./routes/certificates");

const app = express();
app.use(express.json());
app.use("/certificates", certRoutes);

app.listen(4000, () => console.log("Backend running on 4000"));
