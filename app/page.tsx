import FullBackgroundContainer from '@/components/BackgroundMain'
import Hero from '@/components/Hero'
import Product from '@/components/Product'
import ProductGallery from "@/components/ProductGallery";
import CustomerReviews from "@/components/CustomerReviews";
import BigCarousel from "@/components/BigCarousel";
export default function Home() {
  return (
    <>
        <div>
            <FullBackgroundContainer imageUrl="/BGPlant.png">
                <Hero/>
                <Product/>
            </FullBackgroundContainer>
            <div className={'bg-lightBg dark:bg-darkBg'}>
                <ProductGallery/>
                <CustomerReviews/>
                <BigCarousel/>
            </div>
        </div>



    </>
  );
}
