import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import './list.css'

export default function List() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [priceInitial, setPriceInitial] = useState(1)
    const [priceFinal, setPriceFinal] = useState(1000)
    const [status, setStatus] = useState(true)
    const [mode, setMode] = useState('name')
    const [order, setOrder] = useState('')


    useEffect(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:7070'
        })

        async function getProducts() {
            const response = await instance.get('/product')
            const data = response.data
            setData(data)
            setLoading(false)
        }

        getProducts()
    }, [])

    if(loading) { // Mostra um loading simples enquanto a requisição não é finalizada
        return(
            <div className="loading">
                <h2>Carrengado todos os produtos....</h2>
            </div>
        )
    }

    function handlePriceInitial(event) { // Armazena o valor incial para o filtro
        setPriceInitial(parseFloat(event.target.value))
    }

    function handlePriceFinal(event) { // Armazena o valor final para o filtro
        setPriceFinal(parseFloat(event.target.value))
    }

    function handleStatusActive() { // Lida com a mudançã do filtro para status ativo
        setStatus(true)
    }

    function handleStatusInative() { // Lida com a mudançã do filtro para status inativo
        setStatus('')
    }

    function handleModeName() { //lida com a mudança do filtro para pesquisa por nome
        setMode('name')
    }

    function handleModePrice() { //lida com a mudança do filtro para pesquisa por preço
        setMode('price')
    }

    function handleOrder() { //lida com a mudança do filtro para pesquisa crescente
        setOrder('')
    }

    function handleOrderDesc() { //lida com a mudança do filtro para pesquisa decrecente 
        setOrder(true)
    }

    function buscar() { // Pega todas as opções do filtro, e requisita no backend os produtos
        async function getProducts() {

            const instance = axios.create({
                baseURL: 'http://localhost:7070'
            })

            await instance.get('/product/prices', {
                params: {
                    price_inicial: priceInitial,
                    price_final: priceFinal,
                    status: status,
                    mode: mode,
                    desc: order
                }
                
            }).then((response) => {setData(response.data)})

            setLoading(false)
        }

        getProducts()
    }


    return (
        <div className="App">
            <div>
                <label for="preco-inicial">Preço inicial:</label>
                <input type="number" id="preco-inicial" name="preco-inicial" min="0" max="1000" step="1" value={priceInitial} onChange={handlePriceInitial}/>

                <label for="preco-final">Preço final:</label>
                <input type="number" id="preco-final" name="preco-final" min="0" max="1000" step="1" value={priceFinal} onChange={handlePriceFinal}/>

                <label for="status-ativo">Ativo</label>
                <input type="radio" id="status-ativo" name="status" value={status}  onChange={handleStatusActive}/>

                <label for="status-inativo">Inativo</label>
                <input type="radio" id="status-inativo" name="status" value={status}  onChange={handleStatusInative}/>

                <label for="ordenar-nome">Ordenar por nome:</label>
                <input type="radio" id="ordenar-nome" name="ordenar" value={mode} onChange={handleModeName}/>

                <label for="ordenar-preco">Ordenar por preço:</label>
                <input type="radio" id="ordenar-preco" name="ordenar" value={mode} onChange={handleModePrice}/>

                <label for="ordem-crescente">Crescente</label>
                <input type="radio" id="ordem-crescente" name="ordem" value={order} onChange={handleOrder}/>

                <label for="ordem-decrescente">Decrescente</label>
                <input type="radio" id="ordem-decrescente" name="ordem" value={order} onChange={handleOrderDesc}/>

                <button className="button-buscar" onClick={buscar}>Buscar</button>

            </div>
            <div className="product-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Status</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.description}</td>
                                <td>{data.price}</td>
                                <td>{data.status ? 'Ativo' : 'Inativo'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}