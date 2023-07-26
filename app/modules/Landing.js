"use client";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import CameraSection from "@/app/components/CameraSection";
import StartSection from "@/app/components/StartSection";

export default function Landing() {
  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 390px)" });

  const [picture, setPicture] = useState(false);

  const onClickCamera = () => {
    setPicture(!picture);
  };

  if (isMobile || isTablet)
    return (
      <>
        <CameraSection onClickCamera={onClickCamera} picture={picture} />
        <StartSection picture={picture} />
      </>
    );
}
