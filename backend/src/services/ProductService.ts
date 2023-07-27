import prismaClient from "../prisma";

interface Product_data {
    name: string,
    description: string,
    status: boolean,
    price: number,
    image: string
}

interface Product_update {
    id: number
    name: string,
    description: string,
    status: boolean,
    price: number,
    image: string
}

interface between_prices {
    inicial: number,
    final: number,
    status: any,
    mode: string,
    desc: any

}

export class ProductService{
    async create(data : Product_data) { // Adiciona o produto no Banco de dados
        const prisma = prismaClient.products.create({
            data : {
                name : data.name,
                description: data.description,
                status: data.status,
                price: data.price,
                image: data.image
            },
            select: {
                id: true,
                name: true,
                description: true,
                status: true
            }
        })

        await prismaClient.$disconnect().catch(async (e) => {
            console.error(e)
            await prismaClient.$disconnect()
            process.exit(1)
        })

        return prisma
    }

    async update(data : Product_update) { // Atualiza informações no banco de dados
        const prisma = prismaClient.products.update({
            where: {
                id: data.id
            },
            data: {
                name : data.name,
                description: data.description,
                status: data.status,
                price: data.price,
                image: data.image
            }
        })

        await prismaClient.$disconnect().catch(async (e) => {
            console.error(e)
            await prismaClient.$disconnect()
            process.exit(1)
        })

        return prisma
    }

    async delete(id : number) { // Deleta um produto com relação ao seu ID no banco de dados
        const prisma = prismaClient.products.delete({
            where: {
                id: id
            }
        })

        await prismaClient.$disconnect().catch(async (e) => {
            console.error(e)
            await prismaClient.$disconnect()
            process.exit(1)
        })

        return prisma
    }

    async delete_statusOff(id : number) { // Altera o status do produto para false/inativo no banco de dados
        const prisma = prismaClient.products.update({
            where: {
                id: id
            },
            data: {
                status : false
            }
        })

        await prismaClient.$disconnect().catch(async (e) => {
            console.error(e)
            await prismaClient.$disconnect()
            process.exit(1)
        })

        return prisma
    }

    async listBy_prices(prices : between_prices) { // Retorna os produtos, a partir do valor inicial e final em relação aos preços do banco de dados e que esteja com status ativo ou inativo
        
        if(prices.mode == 'name' && prices.desc != true) {
            const prisma = prismaClient.products.findMany({
                where : {
                    price: {
                        lt: prices.final,
                        gt: prices.inicial
                    },
                    status: prices.status
                },
                orderBy: {
                    name : 'asc'
                }
            })
    
            await prismaClient.$disconnect().catch(async (e) => {
                console.error(e)
                await prismaClient.$disconnect()
                process.exit(1)
            })
    
            return prisma

        } else if(prices.mode == 'price' && prices.desc != true) {
            const prisma = prismaClient.products.findMany({
                where : {
                    price: {
                        lt: prices.final,
                        gt: prices.inicial
                    },
                    status: prices.status
                },
                orderBy: {
                    price : 'asc'
                }
            })
    
            await prismaClient.$disconnect().catch(async (e) => {
                console.error(e)
                await prismaClient.$disconnect()
                process.exit(1)
            })
    
            return prisma

        } else if (prices.mode == 'name' && prices.desc == true) {
            const prisma = prismaClient.products.findMany({
                where : {
                    price: {
                        lt: prices.final,
                        gt: prices.inicial
                    },
                    status: prices.status
                },
                orderBy: {
                    name : 'desc'
                }
            })
    
            await prismaClient.$disconnect().catch(async (e) => {
                console.error(e)
                await prismaClient.$disconnect()
                process.exit(1)
            })
    
            return prisma

        } else if (prices.mode == 'price' && prices.desc == true) {
            const prisma = prismaClient.products.findMany({
                where : {
                    price: {
                        lt: prices.final,
                        gt: prices.inicial
                    },
                    status: prices.status
                },
                orderBy: {
                    price : 'desc'
                }
            })
    
            await prismaClient.$disconnect().catch(async (e) => {
                console.error(e)
                await prismaClient.$disconnect()
                process.exit(1)
            })
    
            return prisma
        }
    }

    async list_all() { // Retorna todos os produtos do banco de dados
        const prisma = prismaClient.products.findMany({})

        await prismaClient.$disconnect().catch(async (e) => {
            console.error(e)
            await prismaClient.$disconnect()
            process.exit(1)
        })

        return prisma
    }

    async list_allOn() { // Retorna todos os produtos do banco de dados que estejam ativos
        const prisma = prismaClient.products.findMany({
            where : {
                status : true
            }
        })

        await prismaClient.$disconnect().catch(async (e) => {
            console.error(e)
            await prismaClient.$disconnect()
            process.exit(1)
        })

        return prisma
    }
}
