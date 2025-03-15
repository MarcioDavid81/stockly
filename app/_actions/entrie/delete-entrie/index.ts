"use server"

import { db } from "@/app/_lib/prisma"
import { deleteEntrieSchema, DeleteEntrieShema } from "./schema"
import { revalidatePath } from "next/cache"

export const deleteEntrie = async ({id}: DeleteEntrieShema) => {
    deleteEntrieSchema.parse({id})
    await db.sale.delete({
        where: {
            id,
        }
    })
    revalidatePath("/entries")
}