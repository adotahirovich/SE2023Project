import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongo: process.env.MONGO || "mongodb+srv://anllq:sarajevo@cluster0.8we04.mongodb.net/?retryWrites=true&w=majority",
  port: process.env.PORT || 3000,
  secret: process.env.JWT_SECRET || "Your secret key",
};

export default config;
