import React, { createRef, useEffect, useState } from "react";
import products from "../products.json";
import { GetContext } from "@/app/layout";
import Image from "next/image";
import { CloseIcon } from "./Icons";

const NotificationPopup = ({ openFav }) => {
  const { data, n, _n } = GetContext();
  const [notification, _notification] = useState(null);
  const ref = createRef(null);
  useEffect(() => {
    if (!n) return;
    const x = products.find((a) => a.text == data[0]?.text);
    _notification(x);
    _n(false);
    ref.current = x;
  }, [n]);
  useEffect(() => {
    const timeout = setTimeout(deleteX, 3500);
    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  const deleteX = () => _notification(null);
  return (
    <div
      onClick={openFav}
      className={`notification ${notification && "active"}`}
    >
      <Image
        src={
          notification?.cover || ref.current?.cover || "/Poketo-Logo-Site.png"
        }
        alt="notification image"
        width={100}
        height={100}
      />
      <p>
        <span>{notification?.text || ref.current?.text}</span> has been added to{" "}
        <span>1 list </span>
        successfully.
      </p>
      <button onClick={deleteX} className="close">
        <CloseIcon />
      </button>
    </div>
  );
};

export default NotificationPopup;
