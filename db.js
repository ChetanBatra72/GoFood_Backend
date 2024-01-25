    const mongoose = require("mongoose");
    const mongoURI =
    "mongodb://gofood:ChetanB@ac-robopfc-shard-00-00.elnluhv.mongodb.net:27017,ac-robopfc-shard-00-01.elnluhv.mongodb.net:27017,ac-robopfc-shard-00-02.elnluhv.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-ov2kac-shard-0&authSource=admin&retryWrites=true&w=majority";

    const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        console.log("MongoDB connected");

        // Access the 'food_items' collection directly
        const collection = mongoose.connection.db.collection("food_items");

        // Fetch data using the 'find' method and convert to an array
        const data = await collection.find({}).toArray();

        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const fooddata = await foodCategory.find({}).toArray();
        global.food_Category = fooddata;
        global.food_items = data; // global varaible
            // console.log(global.food_Category);
            // console.log(global.food_items);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
    };

    module.exports = mongoDB;
