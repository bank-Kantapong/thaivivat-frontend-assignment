import { useState, useEffect, useMemo } from "react";

const useResponsive = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHideNavMenu = useMemo(() => {
    return screenWidth <= 1270;
  }, [screenWidth]);

  const isHideRightContent = useMemo(() => {
    return screenWidth <= 1160;
  }, [screenWidth]);

  const isAppSize = useMemo(() => {
    return screenWidth <= 767;
  }, [screenWidth]);

  const isFitAppSize = useMemo(() => {
    return screenWidth <= 485;
  }, [screenWidth]);

  const isExtraSmallAppSize = useMemo(() => {
    return screenWidth <= 300;
  }, [screenWidth]);

  return {
    screenWidth,
    isHideNavMenu,
    isHideRightContent,
    isAppSize,
    isFitAppSize,
    isExtraSmallAppSize
  };
};

export default useResponsive;
