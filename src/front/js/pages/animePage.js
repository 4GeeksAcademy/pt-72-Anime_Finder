import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const AnimePage = () => {
    const { store, actions } = useContext(Context);
    const [anime, setAnime] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const handleFavorites = () => {
        if (isFavorite) {
          actions.deleteFavorites(item.mal_id); // Remove favorite
        } else {
          actions.addFavorites(item.mal_id); // Add favorite
        }
      };

    useEffect(() => {
        async function getAnime() {
            setLoading(true);
            try {
                const response = await fetch("https://api.jikan.moe/v4/anime/" + id + "/full");
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setAnime(data.data);
            } catch (error) {
                console.error(error);
                setAnime(null);
            } finally {
                setLoading(false);
            }
        }
        getAnime();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5 bg-dark text-light">Loading...</div>;
    }

    if (!anime) {
        return <div className="text-center mt-5 bg-dark text-light">Failed to load anime data.</div>;
    }

    return (
        <div className="text-center mt-5 bg-dark">
            <img
                src={item.images?.jpg?.image_url || "placeholder.jpg"}
                className="card-img-top"
                style={{ height: "240px", objectFit: "contain" }}
                alt={item.title || "Anime Image"}
            />
            <div className="text-light">{anime.title || "Anime title not available"}</div>
            <h5 className="card-title fw-bold">{item.title || "Unknown Title"}</h5>
            <p className="card-text">Type: {item.type || "N/A"}</p>
            <p className="card-text">Episodes: {item.episodes || "N/A"}</p>
            <button
              className="btn btn-outline-dark"
              onClick={handleFavorites}
              type="button"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? "❤️" : "♡"}
            </button>
        </div>
    );
};
