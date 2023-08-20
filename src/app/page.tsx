import BlogCard from "@/src/components/common/BlogCard";
import Button from "@/src/components/common/Button";
import ComponentSlides from "@/src/components/common/ComponentSlides";
import ImageBanner from "@/src/components/home/ImageBanner";
import ProductCard from "@/src/components/common/ProductCard";
import { getHome } from "@/src/prisma/home";
import Link from "next/link";

// export const runtime = 'edge';

export default async function Page() {
  const { homeBanner, featured, bestseller, blogs }: Home = await getHome();

  return (
    <main className="mx-8">
      <ImageBanner banner={homeBanner} />
      <div>
        <div className="mt-14 lg:hidden">
          <div className="my-10 text-3xl md:text-[40px] font-bold tracking-wide text-fgTertiary text-center">
            CHECK OUT OUR FAVORITES
          </div>
          <ComponentSlides
            components={featured.map((productCard) => (
              <ProductCard key={productCard.path} productCard={productCard} />
            ))}
            slidesPerView={1}
            centeredSlides={true}
          />
        </div>
        <div className="mt-14 mx-14 hidden lg:flex">
          <div className="w-1/4">
            <div className="my-10 text-3xl font-bold tracking-wide text-fgTertiary">
              Check Out Our Favorites
            </div>
            <Link href="/collections/top-sellers">
              <Button text="View All" />
            </Link>
          </div>
          {featured.map((productCard) => (
            <div key={productCard.path} className="w-1/4 px-1 mb-10">
              <ProductCard productCard={productCard} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mt-14 lg:hidden">
          <div className="my-10 text-3xl md:text-[40px] font-bold tracking-wide text-fgTertiary text-center">
            BEST SELLERS
          </div>
          <ComponentSlides
            components={bestseller.map((productCard) => (
              <ProductCard key={productCard.path} productCard={productCard} />
            ))}
            slidesPerView={1}
            centeredSlides={true}
          />
        </div>
        <div className="mx-14 flex-wrap hidden lg:flex">
          <div className="my-10 w-full">
            <div className="w-max mx-auto text-4xl font-bold tracking-wide text-fgTertiary">
              BEST SELLERS
            </div>
          </div>
          {bestseller.map((productCard) => (
            <div key={productCard.path} className="w-1/3 px-1 mb-10">
              <ProductCard productCard={productCard} />
            </div>
          ))}
        </div>
        <div className="mb-10 w-full">
          <div className="w-max mx-auto">
            <Link href="/collections/all-products">
              <Button text="View All" />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-14 lg:hidden">
          <div className="my-10 text-3xl md:text-[40px] font-bold tracking-wide text-fgTertiary text-center">
            The Newsletter Archive
          </div>
          <ComponentSlides
            components={blogs.map((blogCard) => (
              <div key={blogCard.path} className="h-96">
                <BlogCard blogCard={blogCard} />
              </div>
            ))}
            slidesPerView={2}
            responsive={true}
            centeredSlides={false}
          />
        </div>
        <div className="mx-14 flex-wrap hidden lg:flex">
          <div className="my-10 w-full">
            <div className="w-max mx-auto text-4xl font-bold tracking-wide text-fgTertiary">
              The Newsletter Archive
            </div>
          </div>
          {blogs.map((blogCard) => (
            <div key={blogCard.path} className="w-1/3 px-1 mb-10">
              <BlogCard blogCard={blogCard} />
            </div>
          ))}
        </div>
        <div className="mb-10 w-full">
          <div className="w-max mx-auto">
            <Link href="/blogs/the-newsletter-archive">
              <Button text="View All" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
