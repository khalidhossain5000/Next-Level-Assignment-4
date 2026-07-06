/*
  Warnings:

  - You are about to drop the column `category` on the `Properties` table. All the data in the column will be lost.
  - Added the required column `updated_At` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landLordId` to the `Properties` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_At` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_At" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Properties" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "landLordId" TEXT NOT NULL,
ADD COLUMN     "updated_At" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_landLordId_fkey" FOREIGN KEY ("landLordId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
