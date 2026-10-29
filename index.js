import "dotenv/config";
import express from "express";
import mongoose from "mongoose";


const app = express();
const PORT = process.env.PORT || 3333;
const dbURI = process.env.MONGO_URI || "uri";


// Connection to MongoDB
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Successfully conncted to MongoDB");
  })
  .catch((err) => {
    console.error("Failed connecting to MongoDB", err);
  });


app.use(express.json());


app.get("/", (req,res)=>{
   res.send("Server is working");
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
 });

 