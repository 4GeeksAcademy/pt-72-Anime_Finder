import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const AnimeCard = ({ item, index }) => {
  const { store, actions } = useContext(Context);

  const isFavorite = store.favorites.some((fav) => fav.anime_id === item.mal_id);

  const animePage = () => {
    actions.animePage(item.mal_id);
  };

  const handleFavorites = () => {
    if (isFavorite) {
      actions.deleteFavorites(item.mal_id); // Remove favorite
    } else {
      actions.addFavorites(item.mal_id); // Add favorite
    }
  };

  return (
    <div className="card bg-light shadow-sm" style={{ objectFit: "contain" }}>
      <img
        src={item.images?.jpg?.image_url || "placeholder.jpg"}
        className="card-img-top"
        style={{ height: "240px", objectFit: "contain" }}
        alt={item.title || "Anime Image"}
      />
      <div className="card-body d-flex flex-column" style={{ color: "black" }}>
        <h5 className="card-title fw-bold">{item.title || "Unknown Title"}</h5>
        <p className="card-text">Type: {item.type || "N/A"}</p>
        <p className="card-text">Episodes: {item.episodes || "N/A"}</p>
        <div className="d-flex justify-content-between mt-auto">
          <button className="btn btn-warning me-3"
            type="button"
            aria-label="View Series Info"
          >
            Series Info
          </button>
          {store.token ? (
            <button
              className="btn btn-outline-dark"
              onClick={handleFavorites}
              type="button"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? "❤️" : "♡"}
            </button>
          ) : (
            <span className="text-muted">Log in to favorite</span>
          )}
        </div>
      </div>
    </div>
  );
};
