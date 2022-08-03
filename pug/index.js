const express = require("express");
const app = express();
const Controllers = require("./controllers");
const productCtrl = new Controllers;
const {Router} = express;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const routerProductos = Router();

routerProductos
    .route("/")
    .get(productCtrl.renderAll)
    .post(productCtrl.save)

routerProductos
    .route("/:id")
    .get(productCtrl.getById)
    .put(productCtrl.replaceById)
    .delete(productCtrl.deleteById)


app.use("/productos", routerProductos);

app.set("view engine", "pug");
app.set("views", "./views")


const PORT = 8080
app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})
