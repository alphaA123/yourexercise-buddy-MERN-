//Requiring pakages
const express = require("express");
const cors = require("cors");
// require moongoose for database connection
const mongoose = require("mongoose");

require("dotenv").config();

//creating express server
const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(cors());
app.use(express.json());
//establishing connection to mongodb atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});
/////////////////////////////////////
//requiring the route files
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
//Routing//Whenever user goes to /erercises path the files of exercises router loads, which is defined above
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
////////////////////////////
//starting the server
app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
