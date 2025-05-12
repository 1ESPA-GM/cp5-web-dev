const express= require("express")
const cors= require("cors")
const bodyParser=require("body-parser")
const {v4:uuid}=require("uuid")

const app= express();
const Port=3000;

app.use= (cors());
app.use= (bodyParser.json());
app.use(express.static('static'));

let bicicletas=[];


app.post('/bicicletas', (req,res)=>{
    const{nome,descricao,preco,modelo,estoque}=req.body;
    if(!nome || !descricao || !preco || !modelo || !estoque){
        return res.status(400).json({error: 'Campos obrigatórios'});
    }
    const novoItem={id:uuid(), nome, descricao, preco, modelo, estoque}
    bicicletas.push(novoItem);
    return res.status(201).json(novoItem)
})

app.get('/bicicletas',(req,res)=>{
    res.json(bicicletas)
})

app.put('bicicletas', (req,res)=>{
    const bicicletaId=req.params.id;
    const{nome,descricao,preco,modelo,estoque}=req.body;
    if(!nome || !descricao || !preco || !modelo || !estoque){
        return res.status(400).json({error: 'Campos obrigatórios'})
    }
    const bicicletaIndex = bicicletas.findIndex(item=>item.id===bicicletaId);
    if(bicicletaIndex===-1){
        return res.status(404).json({error:'Produto não encontrado...'})
    }
    bicicletas[bicicletaIndex] = {id:produtoId, nome,descricao,preco,modelo,estoque}
    res.json(bicicletas[bicicletaIndex])
})

app.delete('/bicicletas', (req,res)=>{
    const bicicletaId=req.params.id;
    const inicioBicicleta = bicicletas.length;
    bicicletas= bicicletas.filter(item=>item.id!== bicicletas)
    if (bicicletaId.length === inicioBicicleta){
        return res.status(404).json({error: 'Produto não encontrado'})
    }

})


app.listen(
    Port,
    ()=> console.log(`Está ligado no http://localhost:3000 ${Port}`)
)