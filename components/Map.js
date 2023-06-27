import { Fragment, useState,useEffect } from "react";
import axios from "axios";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

const markers = [
];

export default function Map() {
  
  const [campsiteMarkers, setCampsiteMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(()=>{
    axios.get('/api/campsite?map='+true).then(response => {
        setCampsiteMarkers(response.data);
    });
  }, [])
  useEffect(()=>{
    for (const campsiteMarker of campsiteMarkers) {
        const transformedMarker = {
          id: '/campsite/view/'+ campsiteMarker._id,
          name: campsiteMarker.title,
          position: {
            lat: parseFloat(campsiteMarker.mapLatitute),
            lng: parseFloat(campsiteMarker.mapLangtitute)
          }
        };
      
        markers.push(transformedMarker);
      }
  }, [campsiteMarkers])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCiVMHghOSlJ4bDV9bpUcYDoOg2ZoSSVLY",
  });
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Fragment>
      <div className="container">
        <div style={{ height: "90vh", width: "100%" }}>
        {isLoaded ? (    
            <GoogleMap
              center={{ lat: 38.9637, lng: 35.2433 }}
              zoom={6}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "90vh" }}
            >
              {markers.map(({ id, name, position }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  // icon={{
                  //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
                  //   scaledSize: { width: 50, height: 50 }
                  // }}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <a href={id}>{name}</a>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

