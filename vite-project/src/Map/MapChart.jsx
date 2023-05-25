// INCOMPLET

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { csv } from "https://cdn.skypack.dev/d3-fetch@3";
import {scaleLinear} from "https://cdn.skypack.dev/d3-scale@4";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const property = 'Population (millions)'

const geoUrl = "src/Map/features.json";

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
  const [data, setData] = useState([]);
  const [iso3, setIso3] = useState([]);

  useEffect(() => {
    csv(`/iso3_v2.csv`).then((iso3) => {
      setIso3(iso3);
    });
    csv(`/data.csv`).then((data) => {
      setData(data);
    });
  }, []);

  function iso3toName(code) {
    console.log(iso3);
    console.log(code);
    return iso3['0'][code];
  }


  return (
    <Container>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147
        }}
        className="styles.map-container mapa-gran"
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {

                const d = data.find((s) => {
                  s.Country === iso3[0][geo.id]
                });
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d['Population (millions)']) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </Container>

    
  );
};




export default MapChart;
