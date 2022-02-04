const porta = 3003

const express = require('express')
const app = express();
const bodyParser = require('body-parser');// tranforma a requisicao post em objeto para que se possa manipular
const bancoDeDados = require('./bancoDeDados');

app.use(bodyParser.urlencoded({ extended: true }))// vai parsear a requisicao,
//urlencoded é o padrao que em que os dados estao sendo enviados
//para qualquer requisicao que voce faca no seu servidor usando o express, ele vai obrigatoriamente
//passar por esse middleware
//se no corpo da requisicao tiver um padrao urlenconded ele vai parsear para um objeto
//tornando possivel acessar os dados e manipula-los

app.get('/produtos', (req, res, next) => {

    res.send(bancoDeDados.getProdutos())
})

app.get('/produtos/:id', (req, res, next) => {
    res.send(bancoDeDados.getProduto(req.params.id));
})

app.post('/produtos', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto)
})
app.put('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    })
    res.send(produto)
})
app.delete('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.deleteProduto(req.params.id)
    res.send(produto)
})

app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`);
})