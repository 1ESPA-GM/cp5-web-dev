import {useState, useEffect} from 'react'
import axios from 'axios'

const Bicicletas = () => {
    const URL_API = 'http://localhost:3000/bicicletas'
    const {bicicletas, setBicicletas}= useState([]);
    const {novaBicicleta, setNovaBicicleta} = useState({nome:'', descricao:'', preco:'', modelo:'', estoque:'' });
    const {editar, setEditar} = useState(false)

    const cadastrarBicicletas =async()=>{
        if(!novaBicicleta.nome || !novaBicicleta.descricao || !novaBicicleta.preco || !novaBicicleta.modelo || !novaBicicleta.estoque  ){
            alert("Campo obrigatório!")
            return;
        }
        try{
            const response = await axios.post(URL_API.novaBicicleta)
            setBicicleta([...bicicletas, response.data])
            setNovaBicicleta({nome:'',descricao:'', preco:'', modelo:'', estoque:''})
        }
        catch(error){
            console.log("Erro ao cadastras",error)
        }

    }

    useEffect(()=>{
        consultarProdutos();
    })
    const consultarProduto=async()=>{
        try{
            const response= await axios.get(URL_API)
        }
        catch(error){
            console.log("Erro ao buscar produto")
        }
    }

    const alterarBicicletas =async()=>{
        if(novaBicicleta.nome || novaBicicleta.descricao || novaBicicleta.preco || novaBicicleta.modelo || novaBicicleta.estoque )

    }
    const handleSubmit =() =>{
        if(editar){
            alterarBicicletas();
        }else{
            cadastrarBicicletas
        }
    }



}

 



export default Bicicletas;