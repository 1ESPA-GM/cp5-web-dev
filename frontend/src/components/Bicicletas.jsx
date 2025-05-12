import {useState, useEffect} from 'react'
import axios from 'axios'

const Bicicletas = () => {
    const URL_API = 'http://localhost:3000/bicicletas'
    const {bicicletas, setBicicleta}= useState([]);
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
    const consultarProdutos=async()=>{
        try{
            const response= await axios.get(URL_API)
            setBicicleta(response.data)
        }
        catch(error){
            console.log("Erro ao buscar produto")
        }
    }

    const alterarBicicletas =async()=>{
        if(!novaBicicleta.nome || !novaBicicleta.descricao || !novaBicicleta.preco || !novaBicicleta.modelo || !novaBicicleta.estoque ){
            alert("campo obrigatório")
            return;
        }
        try {
            const response = await axios.put(`${URL_API}/${novaBicicleta.id}`, novaBicicleta);
            setBicicleta(bicicletas.map(bicicleta => bicicleta.id === novaBicicleta.id ? response.data : bicicleta));
            setNovaBicicleta({ nome: '', descricao: '', preco: '', modelo: '', estoque: '' });
            setEditar(false);
        }
        catch(error){
            console.log("Erro ao atualizar produto", error)
        }

        const deletaBicicleta= async(id)=>{
            if(window.confirm("Tem certeza que deseja deletar esse produto?"))
                try{
                    await axios.delete(`${URL_API}/${id}`);
                    setBicicleta(bicicletas.filter((bicicleta)=>(bicicleta.id !== id)))
                }
                catch(error){
                    console.log("Erro ao deletar produto",error)
                }
                else{
                    console.log("Exclusão cancelada")
                }
        }   

        const handleAlterar =(bicicleta) =>{
            setNovaBicicleta(bicicleta)
            setEditar(true)
        }
    const handleSubmit =() =>{
        if(editar){
            alterarBicicletas();
        }else{
            cadastrarBicicletas
        }
    }

    return(
        <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Cadastro de Bicicletas</h1>
    <form className="mb-4">
      <div className="mb-2">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          id="nome"
          placeholder="Nome"
          value={novaBicicleta.nome}
          onChange={(e) => setNovaBicicleta({ ...novaBicicleta, nome: e.target.value })}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
        <input
          type="text"
          id="descricao"
          placeholder="Descrição"
          value={novaBicicleta.descricao}
          onChange={(e) => setNovaBicicleta({ ...novaBicicleta, descricao: e.target.value })}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="preço" className='block text-sm  font-medium text-gray-800'>Preço</label>
        <input 
            type="text" 
            id='preço'
            placeholder='Preço'
            value={novaBicicleta.preco}
            onChange={(e) => setNovaBicicleta({ ...novaBicicleta, preco: e.target.value })}
            className='mt1 p-2 border rounded w-full'
        />
      </div>
      <div className="mb-2">
        <label htmlFor="modelo" className='block text-sm  font-medium text-gray-800'>Modelo</label>
        <input 
            type="text" 
            id='modelo'
            placeholder='Modelo'
            value={novaBicicleta.modelo}
            onChange={(e) => setNovaBicicleta({ ...novaBicicleta, modelo: e.target.value })}
            className='mt1 p-2 border rounded w-full'
        />
      </div>
      <div className="mb-2">
        <label htmlFor="estoque" className='block text-sm  font-medium text-gray-800'>Estoque</label>
        <input 
            type="text" 
            id='estoque'
            placeholder='Estoque'
            value={novaBicicleta.estoque}
            onChange={(e) => setNovaBicicleta({ ...novaBicicleta, estoque: e.traget.value })}
            className='mt1 p-2 border rounded w-full'
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {editar ? 'Alterar' : 'Cadastrar'}
      </button>
    </form>
    <ul>
      {bicicletas.map(bicicleta => (
        <li key={bicicleta.id} className="border p-2 mb-2 rounded flex items-center justify-between">
          <div>
            <strong className="font-semibold">{bicicleta.nome}</strong> {bicicleta.descricao}
          </div>
          <div>
            <button
              onClick={() => handleAlterar(bicicleta)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => deletaProduto(bicicleta.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Deletar
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
)
}

 
}


export default Bicicletas