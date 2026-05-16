"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import Header from "../Header/Header";

import Presentation_1_Img from "./assets/Presentation_1_Img.png";
import Presentation_2_Img from "./assets/Presentation_2_Img.png";
import Presentation_3_Img from "./assets/Presentation_3_Img.png";

import Utils from "../../utils/utils";

const presentationPhotos = [
	Presentation_1_Img,
	Presentation_2_Img,
	Presentation_3_Img,
];
const presentationTitle = [
	"Get a link that you can share",
	"See everyone together",
	"Your meeting is safe",
];
const presentationText = [
	"Click New meeting to get a link that you can send to people that you want to meet with",
	"See multiple people at the same time (with some lag)",
	"Almost no one can join a meeting unless invited or admitted by the host",
];

export default function LandingPage() {
	const router = useRouter();
	const [presentationIndex, setPresentationIndex] = useState(0);
	const [value, setValue] = useState("");
	const [focused, setFocused] = useState(false);

	function createNewRoom() {
		const newRoomId = Utils.idGenerator.generateRoomID(9);
		router.push(`/room/${newRoomId}`);
	}

	function joinRoom(roomId: string) {
		if (!Utils.idGenerator.isRoomIDValid(roomId)) {
			console.warn("RoomID is not valid !");
			return;
		}
		router.push(`/room/${roomId}`);
	}

	function updateInputValue(e: ChangeEvent<HTMLInputElement>) {
		const inputValue = e.target.value;
		let result = inputValue;

		if (value.length === inputValue.length + 1 && value[value.length - 1] === "-") {
			result = result.slice(0, result.length - 1);
		} else if (inputValue.length === 3 || inputValue.length === 7) {
			result += "-";
		}
		setValue(result.slice(0, 11));
	}

	return (
		<div className="LandingPage">
			<Header />
			<div className="LP-Body">
				<div className="LP-B-TextAndButton">
					<div className="LP-B-TAB-Text">HugoMeet, now available for everyone, for free.</div>
					<div className="LP-B-TAB-Text2">
Welcome to my video meeting platform. I made this to show my WebRTC skills. I hope
you like it and maybe find it useful.
					</div>
					<div className="LP-B-TAB-Button">
						<div className="LP-B-TAB-B-CreateNewRoom" onClick={createNewRoom}>
							<div className="LP-B-TAB-B-CNR-Img"></div>
							<div className="LP-B-TAB-B-CNR-Text">New meeting</div>
						</div>
						<div className="LP-B-TAB-B-JoinRoom">
							<label className={`LP-B-TAB-B-JR-Label${focused ? "Blue" : "Grey"}`}>
								<div className="LP-B-TAB-B-JR-L-Img"></div>
								<input
									className="LP-B-TAB-B-JR-L-Input"
									type="text"
									value={value}
									autoComplete="off"
									id="i3"
									aria-controls="i4"
									aria-describedby="i4"
									placeholder="Enter a code"
									spellCheck={false}
									maxLength={50}
									onChange={updateInputValue}
									onFocus={(event) => {
										setFocused(true);
										setValue(event.target.value);
									}}
									onBlur={() => setFocused(false)}
								/>
							</label>
							{(focused || value.length > 0) && (
								<button
									className="LP-B-TAB-B-JR-Button"
									style={{
										color: Utils.idGenerator.isRoomIDValid(value)
											? "#1a73e8"
											: "rgba(60,64,67,0.38)",
									}}
									onClick={() =>
										Utils.idGenerator.isRoomIDValid(value)
											? joinRoom(value)
											: undefined
									}
								>
Join
								</button>
							)}
						</div>
					</div>
					<div className="LP-B-TAB-HR"></div>
					<div className="LP-B-TAB-MoreInfos">
						<span className="LP-MI-Span">
							<a
								className="LP-MI-S-Href"
								href="https://www.youtube.com/channel/UCuKL6gBO82AEBAFc5lWJQFg"
							>
Learn more
							</a>{" "}
about HugoMeet
						</span>
						<span className="LP-MI-Span">contact@hugocabel.com</span>
					</div>
				</div>
				<div className="LP-B-ImgList">
					<div className="LP-B-IL-Content">
						<button
							className="LP-B-IL-C-ButtonLeft"
							disabled={presentationIndex <= 0}
							onClick={() => setPresentationIndex(presentationIndex - 1)}
						>
							<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" className="LP-B-IL-C-BL-Arrow">
								<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path>
							</svg>
						</button>
						<div className="LP-B-IL-C-Content">
							<div className="LP-B-IL-C-C-TextImage">
								<img width="100%" height="100%" alt="presentation images" src={presentationPhotos[presentationIndex].src}></img>
								<div className="LP-B-IL-C-C-TI-text">
									<div className="LP-B-IL-C-C-TI-T-Title">{presentationTitle[presentationIndex]}</div>
									<div className="LP-B-IL-C-C-TI-T-Text">{presentationText[presentationIndex]}</div>
								</div>
							</div>
						</div>
						<button
							className="LP-B-IL-C-ButtonRight"
							disabled={presentationIndex >= 2}
							onClick={() => setPresentationIndex(presentationIndex + 1)}
						>
							<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" className="LP-B-IL-C-BR-Arrow">
								<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
							</svg>
						</button>
					</div>
					<div className="LP-B-IL-IndexList">
						<div className={`LP-B-IL-IL-Item ${presentationIndex === 0 ? "CurrentItem" : ""}`}></div>
						<div className={`LP-B-IL-IL-Item ${presentationIndex === 1 ? "CurrentItem" : ""}`}></div>
						<div className={`LP-B-IL-IL-Item ${presentationIndex === 2 ? "CurrentItem" : ""}`}></div>
					</div>
					<div className="LP-B-IL-MoreInfos">
						<span className="LP-MI-Span">
							<a
								className="LP-MI-S-Href"
								href="https://www.youtube.com/channel/UCuKL6gBO82AEBAFc5lWJQFg"
							>
Learn more
							</a>{" "}
about HugoMeet
						</span>
						<span className="LP-MI-Span">contact@hugocabel.com</span>
					</div>
				</div>
			</div>
		</div>
	);
}
