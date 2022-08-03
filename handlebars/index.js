const express = require("express");
const {engine} = require("express-handlebars");
const app = express();
const Controllers = require("./controllers");
const productCtrl = new Controllers;
const {Router} = express;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))

app.set("view engine", "hbs");
app.set("views", "./views")

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



const PORT = 8080
app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})
