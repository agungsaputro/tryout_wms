const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;



const routerUser = require("./routes/UserRouter");
const routerProduct = require("./routes/ProductRouter");
const routerProductIn = require("./routes/ProductInRouter");
const routerProductOut = require("./routes/ProductOutRouter");
const routerLogin = require("./routes/LoginRouter");

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
  
app.use("/api/v1/user", routerUser);
app.use("/api/v1/product", routerProduct);
app.use("/api/v1/in", routerProductIn);
app.use("/api/v1/out", routerProductOut);
app.use("/api/v1/user", routerLogin);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})