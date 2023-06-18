import mongoose from "mongoose";
import env from "dotenv";
env.config();

mongoose.connect(process.env.MONGO_URI, { //2引数はoption なくても接続できるはず
  useNewUrlParser: true,
  useUnifiedTopology: true
});
