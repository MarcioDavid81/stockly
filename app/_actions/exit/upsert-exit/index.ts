"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertSaleSchema, UpsertSaleSchema } from "./schema";

export const createExit = async (data: UpsertSaleSchema) => {
  upsertSaleSchema.parse(data);
  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });
  for (const product of data.products) {
    const productFromDb = await db.product.findUnique({
      where: {
        id: product.id,
      },
    });
    if (!productFromDb) {
      throw new Error("Product not found");
    }

    /*Verifica se a quantidade de produtos adicionados é maior que a quantidade em estoque */
    const productIsOutOfStock = product.quantity > productFromDb.stock;
    if (productIsOutOfStock) {
      throw new Error("Product out of stock");
    }

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb.price,
      },
    });
    await db.product.update({
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
  revalidatePath("/products");
};
