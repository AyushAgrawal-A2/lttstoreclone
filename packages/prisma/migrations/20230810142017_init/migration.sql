-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "lttProductId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "featureImages" TEXT[],
    "collections" TEXT[],
    "details" JSONB NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranks" (
    "id" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "bestseller" INTEGER NOT NULL,
    "featured" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Ranks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "overlay" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "stars" DOUBLE PRECISION NOT NULL,
    "reviews" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorSwatch" (
    "id" TEXT NOT NULL,
    "imgPosition" INTEGER NOT NULL,
    "colorId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ColorSwatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SizeOption" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SizeOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewStat" (
    "id" TEXT NOT NULL,
    "star_1" INTEGER NOT NULL,
    "star_2" INTEGER NOT NULL,
    "star_3" INTEGER NOT NULL,
    "star_4" INTEGER NOT NULL,
    "star_5" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ReviewStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogCard" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "cardText" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "imgURL" TEXT NOT NULL,

    CONSTRAINT "BlogCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogContent" (
    "id" TEXT NOT NULL,
    "isImage" BOOLEAN NOT NULL,
    "data" TEXT NOT NULL,
    "blogCardId" TEXT NOT NULL,

    CONSTRAINT "BlogContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeBanner" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "imgURL" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "HomeBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSizeOption" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RelatedProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_path_key" ON "Product"("path");

-- CreateIndex
CREATE INDEX "Product_path_idx" ON "Product"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Ranks_productId_key" ON "Ranks"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_productId_key" ON "Rating"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "Color"("name");

-- CreateIndex
CREATE INDEX "Color_name_idx" ON "Color"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SizeOption_symbol_key" ON "SizeOption"("symbol");

-- CreateIndex
CREATE INDEX "SizeOption_symbol_idx" ON "SizeOption"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewStat_productId_key" ON "ReviewStat"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCard_path_key" ON "BlogCard"("path");

-- CreateIndex
CREATE INDEX "BlogCard_path_idx" ON "BlogCard"("path");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSizeOption_AB_unique" ON "_ProductToSizeOption"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSizeOption_B_index" ON "_ProductToSizeOption"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedProducts_AB_unique" ON "_RelatedProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedProducts_B_index" ON "_RelatedProducts"("B");

-- AddForeignKey
ALTER TABLE "Ranks" ADD CONSTRAINT "Ranks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorSwatch" ADD CONSTRAINT "ColorSwatch_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorSwatch" ADD CONSTRAINT "ColorSwatch_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewStat" ADD CONSTRAINT "ReviewStat_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogContent" ADD CONSTRAINT "BlogContent_blogCardId_fkey" FOREIGN KEY ("blogCardId") REFERENCES "BlogCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSizeOption" ADD CONSTRAINT "_ProductToSizeOption_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSizeOption" ADD CONSTRAINT "_ProductToSizeOption_B_fkey" FOREIGN KEY ("B") REFERENCES "SizeOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
