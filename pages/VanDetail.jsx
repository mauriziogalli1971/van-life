import React from "react";
import { useParams } from "react-router-dom";

export default function VanDetail() {
  const { id } = useParams();
  const [van, setVan] = React.useState(null);

  React.useEffect(() => {
      if (localStorage.getItem(id)) {
        setVan(JSON.parse(localStorage.getItem(id)));
      } else {
        fetch(`/api/vans/${id}`)
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem(id, JSON.stringify(data.vans));
            setVan(data.vans);
          });
      }
  }, [id]);

  return (
    <div className="van-detail-container">
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} alt=""/>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
