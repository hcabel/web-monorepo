"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HugoMeetLogo from "./assets/HugoMeetLogo.png";

export default function Header() {
	const [dateTime, setDateTime] = useState(new Date());
	const navigate = useNavigate();
	const location = useLocation();

	function goToTheLandingPage() {
		if (location.pathname !== "/") {
			navigate("/");
		}
	}

	useEffect(() => {
		if (window.clockTimeout !== undefined) {
			clearTimeout(window.clockTimeout);
			window.clockTimeout = undefined;
			return;
		}

		window.clockTimeout = setTimeout(() => {
			setDateTime(new Date());

			if (window.clockInterval !== undefined) {
				clearInterval(window.clockInterval);
				window.clockInterval = undefined;
				return;
			}
			window.clockInterval = setInterval(() => {
				setDateTime(new Date());
			}, 60000);
		}, 60000 - dateTime.getSeconds() * 1000 + dateTime.getMilliseconds());
	}, []);

	function getHours(date: Date) {
		const minutes = date.getMinutes();
		return `${date.getHours()}:${minutes < 10 ? "0" : ""}${minutes}`;
	}
	const hours = getHours(dateTime);

	function getDate(date: Date) {
		const dayLetter = ["Sun", "Mon", "Thu", "Wed", "Thu", "Fri", "Sat"];
		const monthLetter = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return `${dayLetter[date.getDay()]}, ${date.getDate()} ${monthLetter[date.getMonth()]}`;
	}
	const date = getDate(dateTime);

	return (
		<header className="Header">
			<div className="H-Logo" onClick={goToTheLandingPage}>
				<img className="H-L-Logo" src={HugoMeetLogo} alt="HugoMeet logo" />
				<span className="H-L-Hugo">Hugo</span>
				<span className="H-L-Meet">Meet</span>
			</div>
			<div className="H-Date">
				<span>{hours}</span>
				<span> • </span>
				<span>{date}</span>
			</div>
		</header>
	);
}
