
// Include all needed modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import gallery from "./Routes/gallery.js"

// Sets path for config-file.
dotenv.config({
    path: `./.env`
  })

// Create an Express application
const app = express()

app.use(express.json())
// this is the build in express body-parser
app.use(
  express.urlencoded({
    extended: true
  }))
//Enables cors https://expressjs.com/en/resources/middleware/cors.html
app.use(cors())

// Define the port the server will accept connections on
const port = process.env.PORT || 3000

// Routes with passing middleware
app.use("/", gallery)

// Start the server
app.listen(port, function () {
  console.log(`Server is running on port ${port}`)
})
