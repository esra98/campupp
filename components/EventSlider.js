export default function EventSlider({photos}) {
    

  return (
    <>
      <div className="home-slider">
        <div className="slider">
          <div className="slides">
            {photos?.length>0 && photos.map(photo => (
                <img className="rounded-2xl flex object-cover aspect-square" src={photo} key={photo}/>
            ))}
            {!photos?.length>0 && (
                <div></div>
            )}
          </div>
        </div>s
      </div>
    </>
  );
}
