import FullBackgroundContainer from '@/components/BackgroundMain'
import Hero from '@/components/Hero'
import Product from '@/components/Product'
export default function Home() {
  return (
    <>
        <FullBackgroundContainer imageUrl="/BGPlant.png">
            <Hero/>
            <Product/>
        </FullBackgroundContainer>



    </>
  );
}
