import React, { useEffect, useRef, useState } from "react";
import NotFound from "./NotFound";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Image from "next/image";
import { GetContext } from "@/app/layout";
import { HeartIcon } from "./Icons";
import { useRouter } from "next/navigation";

const ProductPage = ({ product }) => {
  const nav = useRouter();
  const { data, _data, _n } = GetContext();
  const [isfavoritesadded, _isfavoritesadded] = useState(false);
  const { text, cover, secondary, price } = product;

  useEffect(() => {
    _isfavoritesadded(
      data.find((_) => _.type == "favorites" && _.text == text) && true
    );
  }, [data]);

  const addfavorite = () => {
    const type = "favorites";
    if (isfavoritesadded) return;
    _data([{ type, text }, ...data]);
    _n(true);
    window.localStorage.setItem(
      "data",
      JSON.stringify([{ type, text }, ...data])
    );
  };
  const contentRef = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    const count = e.target.elements.count.value || 1;
    const ie = data.find((obj) => obj.type == "cart" && obj.text == text);
    const type = "cart";
    if (ie) {
      ie.count = count;
      const _newdata = data.map((obj) => {
        if (obj.text == text && obj.type == type) return ie;
        return obj;
      });
      window.localStorage.setItem(
        "data",
        JSON.stringify([{ type, text, count }, _newdata])
      );
    } else {
      window.localStorage.setItem(
        "data",
        JSON.stringify([{ type, text, count }, ..._data])
      );
    }
    nav.push("/cart");
  };
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
            modules={[Pagination]}
            className="mySwiper"
          >
            {[cover, secondary].map((img) => {
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
          <h1>{text}</h1>
          <h2>{price}</h2>
          <span className="down">
            <form onSubmit={onSubmit}>
              <input
                defaultValue={1}
                max={100}
                min={1}
                type="number"
                name="count"
                id="count"
              />
              <button type="submit">ADD TO CART</button>
            </form>
            <button
              onClick={addfavorite}
              className={`heart ${isfavoritesadded ? "active" : ""}`}
            >
              <HeartIcon />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
