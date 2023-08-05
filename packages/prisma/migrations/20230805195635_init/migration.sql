-- DropForeignKey
ALTER TABLE "ColorSwatch" DROP CONSTRAINT "ColorSwatch_colorId_fkey";

-- AddForeignKey
ALTER TABLE "ColorSwatch" ADD CONSTRAINT "ColorSwatch_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;
