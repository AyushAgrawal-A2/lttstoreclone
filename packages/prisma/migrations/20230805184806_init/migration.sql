/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `SizeOption` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SizeOption_symbol_key" ON "SizeOption"("symbol");

-- CreateIndex
CREATE INDEX "SizeOption_symbol_idx" ON "SizeOption"("symbol");
