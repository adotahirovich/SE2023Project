require("dotenv").config();

const config = {
  mongo: process.env.MONGO || "",
  port: process.env.PORT || 5001,
  secret: process.env.JWT_SECRET || "Your secret key",
};

export default config;
