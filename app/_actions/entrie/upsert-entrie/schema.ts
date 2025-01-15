import { z } from "zod";

export const upsertEntrieSchema = z.object({
  id: z.string().uuid().optional(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type UpsertEntrieSchema = z.infer<typeof upsertEntrieSchema>;