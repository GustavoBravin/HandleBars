const express = require("express");
const exphbs = require("express-handlebars");
const Usuario = require("./models/Usuario");

const app = express();

var usuarios = [
    {
        nome: "Moniky",
        endereco: "Rua José Domingos, São Vicente, n°636",
    },
    {
        nome: "Mafer",
        endereco: "Rua Senador, n°1958",
    },
];

app.engine("handlebars", exphbs.engine());
app.set("view engine","handlebars");

app.get("/",(req,res)=>{
res.render("home",{usuarios})
})

app.get("/usuarios", async (req, res)=>{
    const usuarios = await Usuario.findAll({raw: true});
    res.render("usuarios", { usuarios });
});

app.get("/usuarios/novo",(req,res)=>{
res.render("formUsuario")
})

app.post("/usuarios/novo", async (req, res) => {
    try {
        const { nickname, nome } = req.body;
        
        const dadosUsuario = {
            nickname,
            nome,
        };
        const usuario = await Usuario.create(dadosUsuario);

        res.send("Usuário inserido sob o id " + usuario.id);
    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        res.status(500).send("Erro ao inserir usuário");
    }
});

app.get("/usuarios/:id/uptade", async (req,res)=>{
const id = parseInt(req.params.id)
const usuario = await Usuario.findByPk(id,{raw: true})

})


app.listen(8000,()=>{
console.log("Servidor rodando!")
})

