"use server"

import { db } from "@/app/_lib/prisma"
import { deleteEntrieSchema, DeleteEntrieShema } from "./schema"
import { revalidatePath } from "next/cache"

export const deleteEntrie = async ({ id }: DeleteEntrieShema) => {
  deleteEntrieSchema.parse({ id })

  await db.$transaction(async (trx) => {
    const entrie = await trx.entrie.findUnique({
      where: { id },
      include: {
        entrieProducts: {
          select: {
            productId: true,
            quantity: true,
          },
        },
      },
    })

    if (!entrie) {
      throw new Error("Entrie not found")
    }

    for (const entrieProduct of entrie.entrieProducts) {
      const productFromDb = await trx.product.findUnique({
        where: { id: entrieProduct.productId },
        select: {
          stock: true,
        },
      })

      if (!productFromDb) {
        throw new Error("Product not found")
      }

      if (productFromDb.stock < entrieProduct.quantity) {
        throw new Error("Insufficient stock to delete entrie")
      }

      await trx.product.update({
        where: { id: entrieProduct.productId },
        data: {
          stock: {
            decrement: entrieProduct.quantity,
          },
        },
      })
    }

    await trx.entrie.delete({
      where: { id },
    })
  })

  revalidatePath("/products")
  revalidatePath("/entradas")
}