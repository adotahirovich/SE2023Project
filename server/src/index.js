import app from "./app";
import mongoose from "mongoose";
import config from "./config/config";

mongoose.Promise = global.Promise;
mongoose
  .connect(
    config.mongo /*, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }*/
  )
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Nije proslo", error));

app.listen(config.port, (error) => {
  if (error) return console.log(error);
  console.log(`Server is listening on port ${config.port}`);
});
