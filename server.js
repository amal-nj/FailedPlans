require('dotenv').config()
const mongoose = require("mongoose");

const express = require('express')
const PORT = process.env.PORT || 5300
const server = express()


//mongoose connection
const mongooseConnect = require('./config/mongodb')

const cors = require("cors");
server.use(cors());



//allows json to be sent to via request express
server.use(express.json())


//routes
// server.use('/api/auth', require('./routes/auth.route'))
// server.use('/api/restaurants', require('./routes/restaurants.route'))//might need something for authntication later

// server.use('/api/foodtrucks', require('./routes/foodTrucks.route'))//might need something for authntication later


mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser : true, useUnifiedTopology: true})
.then((   ) => console.log('connected MongDB'),
      (err) => console.log(err))

mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema

const countSchema = new Schema({
 count: {type:Number, default:0}
})

const Count = mongoose.model('Count', countSchema)

server.get("/",  (req, res) => {
    Count.find()
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        return res
          .status(401)
          .json({ error: "error fetching food trucks data", msg: e });
      });
  });
  server.post("/",  (req, res) => {
    Count.find()
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        return res
          .status(401)
          .json({ error: "error fetching food trucks data", msg: e });
      });
  });
//cannot find route
server.use('*', (request, response) => {
 response.status(404).json({message : "Data not found!"})
})

server.listen(PORT, () => console.log(`connected to ${PORT}`))
