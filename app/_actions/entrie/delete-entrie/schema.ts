import { z } from "zod";

export const deleteEntrieSchema = z.object({
    id: z.string().uuid(),
})

export type DeleteEntrieShema = z.infer<typeof deleteEntrieSchema>