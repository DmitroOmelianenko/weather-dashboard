import "./ImagesGalery.scss";

export const ImagesGalery = () => {
  const images = [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
    "https://picsum.photos/400/300?random=4",
    "https://picsum.photos/400/300?random=5",
    "https://picsum.photos/400/300?random=6",
    "https://picsum.photos/400/300?random=7",
    "https://picsum.photos/400/300?random=8"
  ];

  // дублюємо масив, щоб створити безкінечний цикл
  const loopImages = [...images, ...images];

  return (
    <div className="gallery">
        <div className="container">
      <div className="gallery__track">
        {loopImages.map((url, i) => (
          <div key={i} className="gallery__slide">
            <img src={url} alt={`slide-${i}`} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};
