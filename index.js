const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 7000;

// middleware    mern251-1-CURD   2iPK16u45U1i5pze

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://mern251-1-CURD:2iPK16u45U1i5pze@cluster0.3ftktcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function bootstrap() {
    try {
        await client.connect();
        const database = client.db('MERN251-1');
        const userCollection = database.collection('Users');


        // single user
        app.get('/users/:userId', async (req, res) => {
            const id = req.params.userId;
            //  68a4b4aa1d04daaa0353ad3b
            //  ObjectId("68a4b4aa1d04daaa0353ad3b")
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result)
        })



        // get = read
        app.get('/users', async (req, res) => {
            const query = {};
            const result = await userCollection.find(query).toArray();
            res.send(result)
        })

        // post = create
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result);
        })


        // update user
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const query = { _id: new ObjectId(id) } // ke update hbe
            const option = { upsert: true } // update or insert
            const updatedDoc = { // ki update hbe
                $set: {
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    education: user.education
                }
            }
            const result = await userCollection.updateOne(query,updatedDoc,option);
            res.send(result)
        })

        // delete
        app.delete("/users/:id",async(req,res)=>{
            const id = req.params.id;
            const query = {_id:new ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })


    } finally {
        // await client.close();
    }
}
bootstrap().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Home Route')
})

app.listen(port, () => {
    console.log(`Our Backend Run On: ${port}`);
})