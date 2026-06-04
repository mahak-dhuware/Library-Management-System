const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnect");
const cors = require("cors");

require("dotenv").config();

connectDb();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
    "/api/admin",

    require(
        "./routes/adminRoutes"
    )
);

app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
