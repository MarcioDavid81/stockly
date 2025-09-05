import { db } from "@/app/_lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const productId = params.id;
    const product = await db.product.findUnique({
        where: {
            id: productId
        },
    });

    if (!product) {
        return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json(product, { status: 200 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const productId = params.id;
    const body = await request.json();
    const name = body.name;
    const price = body.price;
    const stock = body.stock;
    await db.product.update({
        where: {
            id: productId
        },
        data: {
            name,
            price,
            stock,
        },
    });
    return Response.json({ message: "Product updated" }, { status: 200 });
}


export async function DELETE(e: Request, { params }: { params: { id: string } }) {
    const productId = params.id;
    const product = await db.product.findUnique({
        where: {
            id: productId
        },
    });

    if (!product) {
        return Response.json({ message: "Product not found" }, { status: 404 });
    }

    await db.product.delete({
        where: {
            id: productId
        },
    });
    return Response.json({ message: "Product deleted" }, { status: 200 });
}