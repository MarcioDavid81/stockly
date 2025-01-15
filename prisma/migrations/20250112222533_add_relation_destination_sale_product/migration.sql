/*
  Warnings:

  - You are about to drop the column `destinationId` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `destinationId` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_destinationId_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "destinationId";

-- AlterTable
ALTER TABLE "SaleProduct" ADD COLUMN     "destinationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
