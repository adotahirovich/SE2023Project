import app from "./app";
import mongoose from "mongoose";
import config from "./config/config";
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
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(config.port, (error) => {
  if (error) return console.log(error);
  console.log(`Server is listening on port ${config.port}`);
});