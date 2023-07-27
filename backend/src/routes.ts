import { Router } from "express";
import { ProductController } from "./controllers/ProductController";

export const router = Router()

//Rotas para produtos
router.post('/product', new ProductController().handleCreate) // Rota que cria um produto
router.put('/product', new ProductController().handleUpdate) // Rota para atualizar um produto
router.put('/product/inative', new ProductController().handleDelete_off) // Rota para inativar um produto
router.delete('/product', new ProductController().handleDelete) // Rota para deletar um produto
router.get('/product/prices', new ProductController().handleListBy_prices) // Rota para retornar produtos pelo preço
router.get('/product', new ProductController().handleList_all) // Rota que retorna todos os produtos
router.get('/product/active', new ProductController().handleList_allOn) // Rota que retorna todos os produtos que estejam ativos