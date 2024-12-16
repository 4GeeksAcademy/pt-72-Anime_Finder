import React, { useContext, useState} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Favorites = () => {
	const { store, actions } = useContext(Context);
    const [manga, setManga] = usestate({})
    const { id } = useParams();

    const isFavManga = store.favorites.some(fav => fav.name === item.name && fav.category === category)
    const handleFavManga = () => {
        const isFavManga = store.favorites.some(fav => fav.name === item.name && fav.category === category)
        if (isFavManga) {
            const indexToDelete = store.favorites.findIndex(fav => fav.name === item.name && fav.category === category)
            if (indexToDelete !== -1) {
                actions.deleteFavManga(indexToDelete)
            }
        } else {
            actions.addFavManga({ name: item.name, index, category })
        }
    }

    useEffect(() => {
        async function getManga() {
            const response = await fetch("https://api.jikan.moe/v4/manga/" + id + "/full")
            const data = await response.json()
            setManga(data.data)
        }
        getManga() 
    }, [])
	
	return (
        <div className="favManga text-center mt-5 bg-dark">
            <div className="text-light">{manga.title}</div>
            <h1>Here is your Favorites page</h1>
            <button className="btn-heart btn-outline-dark" onClick={handleFavManga} type="button">
                <FontAwesomeIcon icon="fa-regular fa-heart" />
                <i className="fa-solid" style={{ color: isFavManga ? "#cd1818" : "red" }}></i>
            </button>
        </div>
	);
};