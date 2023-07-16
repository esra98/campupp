import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx'
import Image from 'next/image'
export default function Slider({photos}) {
    

  return (
    <>
      <div className="home-slider">
        <div className="slider">
          <div className="slides">
            <div id="slide-1">
            {photos?.[0] && (
              <Image className="rounded-2xl flex object-cover aspect-square" src={photos[0]}width={300}
              height={300} />
            )}
            </div>
            <div id="slide-2">
            {photos?.[1] && (
              <Image className="rounded-2xl flex object-cover aspect-square" src={photos[1]}width={300}
              height={300} />
            )}
            </div>
            <div id="slide-3">
            {photos?.[2] && (
              <Image className="rounded-2xl flex object-cover aspect-square" src={photos[2]}width={300}
              height={300} />
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}