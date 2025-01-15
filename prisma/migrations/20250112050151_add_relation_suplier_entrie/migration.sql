/*
  Warnings:

  - Added the required column `supplierId` to the `Entrie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrie" ADD COLUMN     "supplierId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Entrie" ADD CONSTRAINT "Entrie_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
