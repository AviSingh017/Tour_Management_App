const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connection } = require("./config/db");
const { tourRoute } = require("./routes/tours");
const { userRoute } = require("./routes/users");
const { authRoute } = require("./routes/auth");
const { reviewRoute } = require("./routes/reviews");
const { bookingRoute } = require("./routes/bookings");

const port = process.env.PORT || 7700;

const corsOptions = {
    origin: true,
    credentials: true
}

app.get("/", (req, res) => {
    res.send("Hello from Backend"); // just 4 checking..
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

app.listen(port, async () => {
    try {
        await connection;
        console.log("Server Connected with Atlas");
    }
    catch (err) {
        console.log(err);
    }
    console.log(`Server is started on port ${port}`)
});
