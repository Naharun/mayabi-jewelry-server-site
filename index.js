const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vkh0edt.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // const jewelryCollection = client.db("jewelryDB").collection("jewelry");
    const jewelryCollection = client.db("jewelryDB").collection("jewelry");
    app.post("/addJewelry", async (req, res) => {
        const jewelries = req.body;
        console.log(req.body);
        const result = await jewelryCollection.insertOne(jewelries);
        res.send(result);
      })
      app.get('/jewelry',  async (req, res) => {
        const result = await jewelryCollection.find().toArray();
        res.send(result)
      })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res) =>{
    res.send("Jewelry is selling")
})

app.listen(port, () =>{
    console.log(`jewelry server is running on port:${port}`);
})