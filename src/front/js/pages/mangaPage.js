import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import MangaCard from "./compoent/mangaCards.jsx";

export const mangaPage = () => {
	const { store, actions } = useContext(Context);
    const [manga, setManga] = useState({})
    const { id } = useParams();

    useEffect(() => {
        async function getMangaImages() {
            const response = await fetch("https://api.jikan.moe/v4/manga/1/pictures")
            const data = await response.json()
            setMangaImages(data.data) 
        }
        getMangaImages() 
    }, [])

    //function handleFindingStreamingService() {
        // const response = await fetch("")
        // const data = await response.json()
        // setAnimes(data) //might need to update this if you data is nested
    // }

	return (
		<div className="d-flex flex-column w-100 mt-0 align-item-center">
			{/* Anime card div */}
			<h1 className="m-2">Popular Manga</h1>
			<div id="cardDiv" className="d-flex flex-nowrap overflow-scroll align-items-stretch">
				{store.mangaImages.map((item, index) => {
					return (
						<MangaCard item={item} index={index} key={index} category="manga" /> 
					)
				})}
			</div>
		</div>
	);
};