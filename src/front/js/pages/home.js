import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { SearchAnime} from "./searchAnime";
// import AnimeCard from "../component/animeCards.jsx";
import MangaCard from "../component/mangaCards.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.token)
	
	
	return (
		<div className="main-div w-100">
			<div className="d-flex flex-column w-100 mt-0 align-item-center">
				{/* Anime card div */}
				<h1 className="m-3">Popular Anime</h1> 
				<div id="cardDiv" className="d-flex flex-nowrap overflow-scroll align-items-stretch">
					{store.anime.map((item, index) => {
						// return (
						// 	<AnimeCard item={item} index={index} key={index} category="anime" /> 
						// )
					})}
				</div>
			</div>
			<div className="d-flex flex-column w-100 mt-0 align-item-center">
				{/* Anime card div */}
				<h1 className="m-2">Classic Anime</h1>
				<div id="cardDiv" className="d-flex flex-nowrap overflow-scroll align-items-stretch">
					{store.anime.map((item, index) => {
						// return (
						// 	<AnimeCard item={item} index={index} key={index} category="anime" />
						// )
					})}
				</div>
			</div>
			<div className="d-flex flex-column w-100 mt-0 align-item-center">
				{/* Anime card div */}
				<h1 className="m-2">Popular Manga</h1>
				<div id="cardDiv" className="d-flex flex-nowrap overflow-scroll align-items-stretch">
					{store.mangaCharacters?.map((item, index) => {
						console.log("item", item);
						return (
						<MangaCard item={item} index={index} key={index} category="manga" /> 
						)
					})}
				</div>
			</div>
		</div>
	);
};
