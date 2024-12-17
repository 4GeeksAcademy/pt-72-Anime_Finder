import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import 'font-awesome/css/font-awesome.min.css'

const AnimeCard = ({ item, index, category }) => {
    const { store, actions } = useContext(Context);
    const [imgErr, setImgErr] = useState(false);

    const handleImgErr = () => setImgErr(true);
    const GUIDE_URL = "https://api.jikan.moe/v4/anime/1/pictures";
    const getImageUrl = () => {
        if (category === "anime") {
            return store.animeImages[index] || noImage;
        } return `${GUIDE_URL}${category}/${index + 1}.jpg`

    }
    const imageStyle = {
        height: category === "anime" ? "180px" :
            category === "manga" ? "254px" :
                "auto",
    };


    const isFavorite = store.favorites.some(fav => fav.name === item.name && fav.category === category)
    const handleFavorites = () => {
        const isFavorite = store.favorites.some(fav => fav.name === item.name && fav.category === category)
        if (isFavorite) {
            const indexToDelete = store.favorites.findIndex(fav => fav.name === item.name && fav.category === category)
            if (indexToDelete !== -1) {
                actions.deleteFavorites(indexToDelete)
            }
        } else {
            actions.addFavorites({ name: item.name, index, category })
        }
    }
    return (

        <div className="card" >
            {/* <img src={`${GUIDE_URL}${category}/${index + 1}.jpg`} className="card-img-top" alt="img not available" /> */}
            <img src={getImageUrl()} onError={handleImgErr} style={imageStyle} className="card-img-top" alt="img not available" />
            <div className="card-body d-flex flex-column" id="cardBody">
                <h5 className="card-title fw-bold">{item.name}</h5>
                <p className="card-text">
                    {
                        category == "data" ? "images: " + item.images :
                            category == "anime" ? "genre: " + item.genre :
                                "status: " + item.status
                    }
                </p>
                <p className="card-text">
                    {
                        category == "data" ? "name: " + item.name :
                            category == "anime" ? "streaming: " + item.streaming :
                                "Model: " + item.model
                    }
                </p>
                <p className="card-text mb-4">
                    {
                        category == "characters" ? "Birth Year: " + item.birth_year :
                            category == "planets" ? "Terrain: " + item.terrain :
                                "Passengers: " + item.passengers
                    }
                </p>
                <div id="cardBtnGroup" className="d-flex justify-content-between mt-auto">
                    <Link to={"/details/" + category + "/" + index}>
                        <button className="btn btn-warning" type="button">Learn more!</button>
                    </Link>
                    
                    <button className="btn-heart btn-outline-dark" onClick={handleFavorites} type="button">
                        <FontAwesomeIcon icon="fa-regular fa-heart" />
                        <i className="fa-solid" style={{ color: isFavorite ? "#cd1818" : "red" }}></i>
                    </button>
                </div>
            </div>
        </div>

    );




};

export default AnimeCard