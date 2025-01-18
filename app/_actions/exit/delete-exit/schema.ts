import { z } from "zod";

export const deleteExitSchema = z.object({
    id: z.string().uuid(),
})

export type DeleteExitShema = z.infer<typeof deleteExitSchema>