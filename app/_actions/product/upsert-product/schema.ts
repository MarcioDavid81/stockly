import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .trim()
    .min(3, { message: "O nome do produto é obrigatório" }),
  price: z.number().min(0.01, { message: "O preço do produto é obrigatório" }),
  stock: z.coerce
    .number()
    .int()
    .min(0, { message: "A quantidade do produto é obrigatória" }),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;