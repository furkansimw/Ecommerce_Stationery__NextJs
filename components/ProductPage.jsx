import React, { useEffect, useRef, useState } from "react";
import NotFound from "./NotFound";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Image from "next/image";

const ProductPage = ({ product }) => {
  const contentRef = useRef(null);
  useEffect(() => {
    const worker = () => {};
    window.addEventListener("scroll", worker);
  }, [contentRef.current]);
  if (!product) return <NotFound />;

  return (
    <div className="productpage">
      <div className="details">
        <div className="images">
          <Swiper
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {[product.cover, product.secondary].map((img) => {
              return (
                <SwiperSlide>
                  <div className="ta">
                    <Image
                      src={img}
                      quality={100}
                      alt="img"
                      width={500}
                      height={500}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="texts">
          <h1>Texsts</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
