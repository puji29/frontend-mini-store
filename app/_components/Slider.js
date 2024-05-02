import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function Slider({ sliderList }) {
  
  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider, index) => (
          <CarouselItem key={index}>
            <Image
              src={slider?.url } // Tambahkan URL default jika tidak ada
              alt="slider"
              width={400}
              height={400}
              unoptimized='true'
              className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
              priority={index === 0} // Hanya gambar pertama yang memiliki prioritas
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Slider;
