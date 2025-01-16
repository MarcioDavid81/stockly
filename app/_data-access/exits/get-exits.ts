import "server-only"
import { db } from "@/app/_lib/prisma"

export interface ExitsDto {
    id: string,
    productName: string,
    totalProducts: number,
    totalAmount: number,
    date: Date,
}

export const getExits = async (): Promise<ExitsDto[]> => {
    const exits = await db.sale.findMany({
        include: {
            saleProducts: {
                include: {
                    product: true,
                }
            },
        }
    });
    return exits.map((sale) => ({
        id: sale.id,
        date: sale.date,
        productName: sale.saleProducts.map(product => product.product.name).join(", "),
        totalAmount: sale.saleProducts.reduce((acc, saleProduct) => acc + saleProduct.quantity * Number(saleProduct.unitPrice), 0),
        totalProducts: sale.saleProducts.reduce((acc, saleProduct) => acc + saleProduct.quantity, 0),
    }))
}