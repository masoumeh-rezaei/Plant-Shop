// در فایل pages/index.tsx یا app/page.tsx
import ProductCard from "@/components/ProductCard1"; // فرض می‌کنیم کامپوننت اصلی با نام ProductCard در دسترس است.
import ReversedProductCard from "@/components/ProducrCard2"; // کامپوننت جدید که جای عکس و متن آن عوض شده.

export default function HomePage() {
    return (
        <div className=" flex flex-col gap-20 p-10 ">

            {/* یک کانتینر برای نمایش دو کارت در کنار هم */}


                {/* کارت اول: با طرح‌بندی اصلی */}
                <ProductCard
                    title="For Small Desk Moder Plant"
                    description1="Ergonomic design for maximum comfort."
                    description2="Made with high-quality, durable materials."
                    price="$129.99"
                    imageUrl="/product4.png"
                />

                {/* کارت دوم: با طرح‌بندی معکوس */}
                <ReversedProductCard
                    title="For Small Desk Moder Plant"
                    description1="Ergonomic design for maximum comfort."
                    description2="Made with high-quality, durable materials."
                    price="$129.99"
                    imageUrl="/product10.png"
                />


        </div>
    );
}