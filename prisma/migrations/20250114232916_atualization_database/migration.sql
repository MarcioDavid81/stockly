/*
  Warnings:

  - You are about to drop the column `destinationId` on the `SaleProduct` table. All the data in the column will be lost.
  - You are about to drop the `Destination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entrie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntrieProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entrie" DROP CONSTRAINT "Entrie_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "EntrieProduct" DROP CONSTRAINT "EntrieProduct_entrieId_fkey";

-- DropForeignKey
ALTER TABLE "EntrieProduct" DROP CONSTRAINT "EntrieProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_destinationId_fkey";

-- AlterTable
ALTER TABLE "SaleProduct" DROP COLUMN "destinationId";

-- DropTable
DROP TABLE "Destination";

-- DropTable
DROP TABLE "Entrie";

-- DropTable
DROP TABLE "EntrieProduct";

-- DropTable
DROP TABLE "Supplier";
