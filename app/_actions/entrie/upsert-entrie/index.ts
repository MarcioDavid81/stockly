"use server";

import { revalidatePath } from "next/cache";
import { UpsertEntrieSchema, upsertEntrieSchema } from "./schema";
import { db } from "@/app/_lib/prisma";

export const createEntrie = async (data: UpsertEntrieSchema) => {
  upsertEntrieSchema.parse(data);
  const entrie = await db.entrie.create({
    data: {
        date: new Date(),
    }
  })
  for (const product of data.products) {

    /*Verifica se o produto existe */
    const productFromDb = await db.product.findUnique({
      where: {
        id: product.id,
      },
    });
    if (!productFromDb) {
      throw new Error("Product not found");
    }

    /*Cria a entrada do produto */
    await db.entrieProduct.create({
      data: {
        entrieId: entrie.id,
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
          increment: product.quantity,
        },
      },
    });
  }
  revalidatePath("/products");
};
