import './home.css';
import { Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios'

function Home() {

  const [data, setData] = useState([])
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const instance = axios.create({
      baseURL:'http://localhost:7070'
    })

    async function getProduct(){
      const response = await instance.get('/product/active')
      const data = response.data
      setData(data)
      setLoading(false)
    }

    getProduct()

  }, [])

  const handleSubmit = async (event) => { // Adiciona um produto
    event.preventDefault();

    const dataSended = {
      product: product,
      description: description,
      price: price
    }

    if(selectedProduct) { // Caso for editar um produto, cairá neste escopo

      await axios.put('http://localhost:7070/product', {
        id: selectedProduct.id,
        name: dataSended.product,
        description: dataSended.description,
        status: true,
        price: dataSended.price,
        image: 'wweew.jfdjfds.jpg'
      })
      setIsEditing(false)

    } else {

      if(dataSended.product === '' || dataSended.description === '' || dataSended.price === '') {
        alert('Preencha todos os campos corretamente!')
        return
      }
  
      await axios.post('http://localhost:7070/product', {
        name: dataSended.product,
        description: dataSended.description,
        status: true,
        price: dataSended.price,
        image: 'wweew.jfdjfds.jpg'
      })

    }

    setProduct('')
    setDescription('')
    setPrice('')
    setSelectedProduct(null)

    const instance = axios.create({
      baseURL:'http://localhost:7070'
    })

    async function getProduct(){
      const response = await instance.get('/product/active')
      const dt = response.data
      setData(dt)
    }

    getProduct()
  }

  async function handleDelete(id) { // Inativa um item
    let filterItem = data.filter((data) => {
      return (data.id !== id)
    })

    await axios.put('http://localhost:7070/product/inative', {
      id : id
    })

    setData(filterItem)
  }

  const handleProductChange = (event) => {
    setProduct(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handlePriceChange = (event) => {
    setPrice(event.target.value)
  }

  const handleEdit = (id) => { // Recebe o id do produto a ser editado

    const selected = data.find((product) => product.id === id)
    
    setSelectedProduct(selected)
    setProduct(selected.name)
    setDescription(selected.description)
    setPrice(selected.price)
    setIsEditing(true)

  }

  if(loading) {
    return(
      <div className='loading'>
        <h2>Carregando produtos...</h2>
      </div>
    )
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <title>Novo Produto</title>
      </header>  
      <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label>Produto:</label>
                <input type="text" id="nome_produto" name="nome_produto" value={product} onChange={handleProductChange}/>
            </div>
            <div className="form-row">
                <label>Descrição:</label>
                <input type="text" id="descricao" name="descricao" value={description} onChange={handleDescriptionChange}/>
            </div>
            <div className="form-row">
                <label>Preço:</label>
                <input type="text" id="preco" name="preco" value={price} onChange={handlePriceChange}/>
            </div>
            <div className="form-row">
                <input type="submit" value={isEditing ? 'Atualizar' : 'Registrar'}/>
                <Link to= '/product'>
                  <input type="button" value={'Listar Produtos'}/>
                </Link>
                
            </div>
          </form>

          <div className='product-table'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.price}</td>
                    <td>
                      <button onClick={() => handleEdit(data.id)}>Editar</button>
                      <button onClick={() => handleDelete(data.id)}>Deletar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  );
}

export default Home;
