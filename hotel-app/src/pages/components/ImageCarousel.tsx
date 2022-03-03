import { PropsWithoutRef, useState } from "react";

interface ImageCarouselProps {
  imagesArray: string[];
}

export default function ImageCarousel({
  imagesArray,
}: PropsWithoutRef<ImageCarouselProps>) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const changeSelectedIndex = (e: any, index: number) => {
    e.preventDefault();
    setSelectedImageIndex(index);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "block",
        borderRadius: 5,
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            bottom: 0,
          }}
        >
          {imagesArray.length >= 2 &&
            imagesArray.map((x, index) => {
              const isActive = index === selectedImageIndex;
              const activeStyle = isActive
                ? { opacity: "80" }
                : { text: "darker", opacity: "30" };
              return (
                <div
                  key={x}
                  style={{ bottom: 0, left: 0, right: 0 }}
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={(e) => changeSelectedIndex(e, index)}
                >
                  <i
                    style={{ cursor: "pointer", color: "white", margin: 2 }}
                    className={`fas fa-circle text-xs cursor-pointer text-darker transition-opacity duration-200 ${activeStyle}`}
                  ></i>
                </div>
              );
            })}
        </div>
      </div>
      <img
        style={{ height: "100%", objectFit: "cover" }}
        sizes="300"
        src={imagesArray[selectedImageIndex]}
        alt={`Carousel ${selectedImageIndex}`}
      />
    </div>
  );
}
