"use server"

import { db } from "@/app/_lib/prisma"
import { deleteExitSchema, DeleteExitShema } from "./schema"
import { revalidatePath } from "next/cache"

export const deleteExit = async ({id}: DeleteExitShema) => {
    deleteExitSchema.parse({id})
    await db.sale.delete({
        where: {
            id,
        }
    })
    revalidatePath("/sales")
}