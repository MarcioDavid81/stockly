/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { ProductIsOutOfStockError, upsertSaleSchema, UpsertSaleSchema } from "./schema";

interface CreateExitResponse {
  data?: any;
  error?: any;
}


export const createExit = async (data: UpsertSaleSchema): Promise<CreateExitResponse>=> {
  upsertSaleSchema.parse(data);
  const response: CreateExitResponse = {
    error: null,
    data: null,
  };
  await db.$transaction(async (trx) => {
    const sale = await trx.sale.create({
      data: {
        date: new Date(),
      },
    });
    for (const product of data.products) {

      /*Verifica se o produto existe */
      const productFromDb = await db.product.findUnique({
        where: {
          id: product.id,
        },
      });
      if (!productFromDb) {
       return response.error = "Product not found";
      }
  
      /*Verifica se a quantidade de produtos adicionados é maior que a quantidade em estoque */
      const productIsOutOfStock = product.quantity > productFromDb.stock;
      if (productIsOutOfStock) {
        return response.error = new ProductIsOutOfStockError().message;
      }
      
      /*Cria a saída do produto */
      await trx.saleProduct.create({
        data: {
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
          unitPrice: productFromDb.price,
        },
      });
      await trx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }
    response.data = sale;
  })
  revalidatePath("/products");
  return response;
};
