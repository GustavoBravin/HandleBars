require("dotenv").config();
const conn = require("./db/conn");
const express = require("express");
const exphbs = require("express-handlebars");
const Usuario = require("./models/Usuario");
const{where} = require("sequelizer")
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine","handlebars");

app.use(express.urlencoded({ extended:true }));
app.use(express.json())

app.get("/",(req,res)=>{
res.render("home")
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
        const {nickname,nome} = req.body;
      
        
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

app.post("/usuarios/:id/update", async (req, res)=> {
    const id = parseInt(req.params.id)
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };

    const retorno = await Usuario.update({dadosUsuario,  where: {id:id} })
    if(retorno>0){
        res.redirect("/usuarios")
    }else{
        res.send("Erro ao atualizar user :(")
    }
});
app.listen(8000,()=>{
console.log("Servidor rodando!")
})

