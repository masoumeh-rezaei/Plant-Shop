import FullBackgroundContainer from '@/components/BackgroundMain'
import Hero from '@/components/Hero'
import Banner from '@/components/banner'
export default function Home() {
  return (
    <>
        <FullBackgroundContainer imageUrl="/BGPlant.png">
            <Hero/>
            <Banner/>
        </FullBackgroundContainer>



    </>
  );
}
