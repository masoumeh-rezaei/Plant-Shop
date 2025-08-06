import FullBackgroundContainer from '@/components/BackgroundMain'
import Hero from '@/components/Hero'
import Product from '@/components/Product'
import ProductGallery from "@/components/ProductGallery";
import CustomerReviews from "@/components/CustomerReviews";
export default function Home() {
  return (
    <>
        <FullBackgroundContainer imageUrl="/BGPlant.png">
            <Hero/>
            <Product/>
            <ProductGallery/>
            <CustomerReviews/>
        </FullBackgroundContainer>



    </>
  );
}
