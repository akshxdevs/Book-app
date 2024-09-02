const express = require("express")
const cors = require("cors");
const app = express();
const port  = 3000;
const router = express.Router();
const db = require("./db/index");


const LoginRoutes  = require('./routes/loginRoutes');
const SignupRoutes  = require('./routes/signupRoutes');
const BookRoutes  = require('./routes/bookRoutes');
const ForgotPwdRoutes  = require('./routes/fogotPwdRoutes');


app.use(express.json());
app.use(cors());

app.use("/set",LoginRoutes);
app.use("/set",SignupRoutes);
app.use("/set",BookRoutes);
app.use("/set",ForgotPwdRoutes);
app.use("/set",router);

module.exports = app;

if (db) {
    app.listen(port,()=>{
        console.log(`app lisenting on port ${port}`);
    })   
}


