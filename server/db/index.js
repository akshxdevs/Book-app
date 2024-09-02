const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/",{dbName:"book-app"}, { useNewUrlParser: true,
    useUnifiedTopology: true,}).then(()=>{
        console.log("connected to mongoDB sucessfully");
    }).catch((error)=>{
        console.error("Error while connecting to mongoDB!!",error);
    })

    module.exports = mongoose;