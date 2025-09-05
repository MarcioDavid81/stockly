import { db } from "@/app/_lib/prisma";

//Aqui estamos utilizando Route Handlers => https://nextjs.org/docs/app/building-your-application/routing/route-handlers
//Apenas para fins de demonstração, não use em produção Route Handlers com Prisma Client, pode ser substituído por Data Access Layer (DAL) => https://nextjs.org/blog/security-nextjs-server-components-actions



export async function GET() {
  const products = await db.product.findMany();
  return Response.json(products, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = body.name;
  const price = body.price;
  const stock = body.stock;
  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  });
  return Response.json({ message: "Product created" }, { status: 201 });
}
