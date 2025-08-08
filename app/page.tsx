import FullBackgroundContainer from '@/components/(landing)/BackgroundMain'
import Hero from '@/components/(landing)/Hero'
import Product from '@/components/(landing)/Product'
import ProductGallery from "@/components/(landing)/ProductGallery";
import CustomerReviews from "@/components/(landing)/CustomerReviews";
import BigCarousel from "@/components/(landing)/BigCarousel";
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
