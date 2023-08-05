/*
  Warnings:

  - Made the column `colorId` on table `ColorSwatch` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ColorSwatch" DROP CONSTRAINT "ColorSwatch_colorId_fkey";

-- AlterTable
ALTER TABLE "ColorSwatch" ALTER COLUMN "colorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ColorSwatch" ADD CONSTRAINT "ColorSwatch_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
