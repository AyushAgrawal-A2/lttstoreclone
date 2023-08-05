-- DropForeignKey
ALTER TABLE "ColorSwatch" DROP CONSTRAINT "ColorSwatch_colorId_fkey";

-- AlterTable
ALTER TABLE "ColorSwatch" ALTER COLUMN "colorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ColorSwatch" ADD CONSTRAINT "ColorSwatch_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;
