import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// import 'font-awesome/css/font-awesome.min.css'

const MangaCard = ({ item, index, category }) => {
    const { store, actions } = useContext(Context);
    const [imgErr, setImgErr] = useState(false);

    const handleImgErr = () => setImgErr(true);
    const GUIDE_URL = "https://api.jikan.moe/v4/manga/1/pictures";
    const getImageUrl = () => {
        if (category === "manga") {
            return store.animeImages[index] || noImage;
        } return `${GUIDE_URL}${category}/${index + 1}.jpg`

    }
    const imageStyle = {
        height: category === "manga" ? "180px" :
            category === "genre" ? "254px" :
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
    console.log(item)
    return (

        <div className="card" >
            <h1>Hello</h1>
            {/* <img src={`${GUIDE_URL}${category}/${index + 1}.jpg`} className="card-img-top" alt="img not available" /> */}
            <img src={getImageUrl()} onError={handleImgErr} style={imageStyle} className="card-img-top" alt="img not available" />
            <div className="card-body d-flex flex-column" id="cardBody">
                <h5 className="card-title fw-bold">{item.name}</h5>
                <p className="card-text">
                    {
                        category == "characters" ? "Gender: " + item.gender :
                            category == "manga" ? "genre: " + item.genre :
                                "image: " + item.image
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

export default MangaCard