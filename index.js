const cors = require('cors');
const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");

//implemented a CORS for cross connection b/w frontend & backend
app.use(cors({
  origin: 'http://localhost:3000',  // Update with your frontend origin
  credentials: true,
}));
//  app.use(cors({
//     origin: '*',  // Update with your frontend origin
//     // credentials: true,
//   }));

// app.use((req, res,next)=>{
//    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
//    res.header(
//     "Access-Control-Allow-Headers" ,
//     "Origin,X-Requested-With,Content-Type, Accept"
//    );
//    next(); // give the call to the next handler
// });
// IIFE Function is used below

(async ()=>{
  app.get("/", (req, res) => {
  res.send("Hello World!"); // The send method is used to send a response to the client
})

await mongoDB();


app.use(express.json()); // it is a middle ware
app.use('/api' , require("./Routes/CreateUser"));
app.use('/api' , require("./Routes/DisplayData"));
app.use('/api' , require("./Routes/OrderData"));
app.listen(port, () => {
  //To start the server, it listens for incoming requests on a specified port
  console.log(`Example app listening on port ${port}`);
})
})()
