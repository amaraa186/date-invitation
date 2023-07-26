"use client";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import CameraSection from "@/app/components/CameraSection";
import StartSection from "@/app/components/StartSection";

export default function Landing() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const [picture, setPicture] = useState(false);

  const onClickCamera = () => {
    setPicture(!picture);
  };

  if (isTabletOrMobile)
    return (
      <>
        <CameraSection onClickCamera={onClickCamera} picture={picture} />
        <StartSection picture={picture} />
      </>
    );
}
