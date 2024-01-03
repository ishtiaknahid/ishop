import ImageSlider from "../components/ImageSlider";
import { heroSliderImages } from "../assets/heroSectionSlide";

function Hero() {
  return (
    <div className="m-auto flex flex-col">
      <div className="m-auto  w-[100%]">
        <ImageSlider images={heroSliderImages} imgSize={"h-[380px] w-[100%]"} />
      </div>
    </div>
  );
}

export default Hero;
