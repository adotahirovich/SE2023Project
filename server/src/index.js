import app from "./app.js";
import mongoose from "mongoose";
import config from "./config/config.js";
import path from 'path';

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, '../client', 'build', 'index.html'));
  });
}

app.listen(config.port, (error) => {
  if (error) return console.log(error);
});