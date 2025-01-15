-- CreateTable
CREATE TABLE "Entrie" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entrie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntrieProduct" (
    "id" TEXT NOT NULL,
    "entrieId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntrieProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EntrieProduct" ADD CONSTRAINT "EntrieProduct_entrieId_fkey" FOREIGN KEY ("entrieId") REFERENCES "Entrie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntrieProduct" ADD CONSTRAINT "EntrieProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
