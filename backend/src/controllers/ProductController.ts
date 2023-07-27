import { ProductService } from "../services/ProductService";
import { Request, Response } from "express";

export class ProductController {
    async handleCreate(req: Request, res: Response) { // Controlador para enviar os dados para o Banco de dados
        const {name, description, status, price, image} = req.body
        const data = {
            name: name,
            description: description,
            status: status,
            price: parseFloat(price),
            image: image
        }
        const productService = new ProductService()
        const created = await productService.create(data)
        return res.json(created)
    }

    async handleUpdate(req: Request, res: Response) { // Controlador para ataulizar os dados no Banco de dados
        const {id, name, description, status, price, image} = req.body
        const data = {
            id: id,
            name: name,
            description: description,
            status: status,
            price: parseFloat(price),
            image: image
        }
        const productService = new ProductService()
        const update = await productService.update(data)
        return res.json(update)
    }

    async handleDelete(req: Request, res: Response) { // Controlador para deletar dados no banco de dados
        const { id } = req.body
        const parse_id = parseInt(id)
        const productService = new ProductService()
        const deleted = await productService.delete(parse_id)
        return res.json(deleted)
    }

    async handleDelete_off(req: Request, res: Response) { // Controlador para alterar o status para inativo
        const { id } = req.body
        const parse_id = parseInt(id)
        const productService = new ProductService()
        const deleted = await productService.delete_statusOff(parse_id)
        return res.json(deleted)
    }

    async handleListBy_prices(req: Request, res: Response) { // Controlador para retornar todos os produtos pelo preço
        const price_inicial = req.query.price_inicial as string
        const price_final = req.query.price_final as string
        const status = req.query.status
        const mode = req.query.mode as string
        const desc = req.query.desc

        const data = {
            inicial : parseInt(price_inicial),
            final: parseInt(price_final),
            status: Boolean(status),
            mode: mode,
            desc: Boolean(desc)
        }
        const productService = new ProductService()
        const listed = await productService.listBy_prices(data)
        return res.json(listed)
    }

    async handleList_all(req: Request, res: Response) { // Controlador para retornar todos os produtos
        const productService = new ProductService()
        const listed = await productService.list_all()
        return res.json(listed)
    }

    async handleList_allOn(req: Request, res: Response) { // Controlador para retornar todos os produtos que estejam ativos
        const productService = new ProductService()
        const listed = await productService.list_allOn()
        return res.json(listed)
    }
}