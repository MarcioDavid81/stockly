import "server-only"
import { db } from "@/app/_lib/prisma"

export interface EntriesDto {
    id: string,
    productName: string,
    totalProducts: number,
    totalAmount: number,
    date: Date,
}

export const getEntries = async (): Promise<EntriesDto[]> => {
    const entries = await db.entrie.findMany({
        include: {
            entrieProducts: {
                include: {
                    product: true,
                }
            },
        }
    });
    return entries.map((entrie) => ({
        id: entrie.id,
        date: entrie.date,
        productName: entrie.entrieProducts.map(product => product.product.name).join(", "),
        totalAmount: entrie.entrieProducts.reduce((acc, entrieProduct) => acc + entrieProduct.quantity * Number(entrieProduct.unitPrice), 0),
        totalProducts: entrie.entrieProducts.reduce((acc, entrieProduct) => acc + entrieProduct.quantity, 0),
    }))
}