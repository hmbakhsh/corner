import {
	ArrowUpIcon,
	CircleIcon,
	CursorArrowIcon,
	ImageIcon,
	LetterCaseCapitalizeIcon,
	Link2Icon,
	SquareIcon,
} from "@radix-ui/react-icons";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useState } from "react";

const cld = new Cloudinary({
	cloud: {
		cloudName: "dixbuzvem",
	},
});

const cloudName = "dixbuzvem";

function LinkInput({ setLinkInput }) {
	return (
		<form
			className="link-form"
			action=""
			style={{
				position: "absolute",
				bottom: 80,
				left: "50%",
				transform: "translateX(-50%)",
			}}
			onSubmit={(e) => {
				e.preventDefault();
				const form = e.currentTarget;
				const formElements = form.elements as typeof form.elements & {
					link: { value: string };
				};
				console.log(formElements.link.value);
				setLinkInput(false);
			}}
		>
			<input
				className="w-96 bg-neutral-800 px-5 py-4 rounded-md text-xl font-medium outline-none"
				type="text"
				name=""
				id="link"
				onBlur={() => setLinkInput(false)}
				autoFocus
			/>
			{/* <input
				type="submit"
				value="Submit"
				className="bg-indigo-600 px-5 py-4 rounded-md text-xl font-semibold ml-3"
			/> */}
		</form>
	);
}

export default function CanvasToolBar({
	handleTextButtonClick,
	handleShapeButtonClick,
	handleImageButtonClick,
}) {
	const [linkInput, setLinkInput] = useState(false);

	function uploadImage(e) {
		const uploadedImage = e.target.files[0];
		const uploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

		const fd = new FormData();
		fd.append("upload_preset", "public_upload");
		fd.append("file", uploadedImage);

		fetch(uploadURL, {
			method: "POST",
			body: fd,
		})
			.then((res) => res.json())
			.then((data) => {
				const { secure_url, height, width } = data;
				handleImageButtonClick(secure_url, height, width);
				// handleImageButtonClick(data.secure_url);
			});
	}

	return (
		<>
			{linkInput && <LinkInput setLinkInput={setLinkInput} />}
			<div
				style={{
					position: "absolute",
					bottom: 15,
					left: "50%",
					transform: "translateX(-50%)",
				}}
			>
				{/* Cursor Button */}
				<div className="flex gap-2 bg-neutral-800 w-min px-4 py-2 rounded-md">
					<button
						type="button"
						className="p-1 hover:bg-indigo-600 hover:rounded-md"
					>
						<CursorArrowIcon width={"26px"} height={"26px"} />
					</button>

					{/* Text Button */}
					<button
						type="button"
						className="p-1 hover:bg-indigo-600 hover:rounded-md"
						onClick={handleTextButtonClick}
					>
						<LetterCaseCapitalizeIcon width={"30px"} height={"30px"} />
					</button>

					{/* Image Button */}
					<input
						type="file"
						accept="image/*"
						name=""
						id="fileInput"
						className="hidden"
						// onChange={handleImageButtonClick}
						onChange={(e) => uploadImage(e)}
					/>
					<button
						type="button"
						className="p-1 hover:bg-indigo-600 hover:rounded-md"
						// onClick={handleImageButtonClick}
						onClick={() => document.getElementById("fileInput")?.click()}
					>
						<ImageIcon width={"30px"} height={"30px"} />
					</button>

					{/* Link Button */}
					<button
						type="button"
						className="p-1 hover:bg-indigo-600 hover:rounded-md"
						onClick={() => setLinkInput(true)}
					>
						<Link2Icon width={"30px"} height={"30px"} />
					</button>

					{/* Circle Shape Button */}
					<button
						type="button"
						className="p-1 hover:bg-indigo-600 hover:rounded-md"
						onClick={() => handleShapeButtonClick("circle")}
					>
						<CircleIcon width={"30px"} height={"30px"} />
					</button>

					{/* Square Shape Button */}
					<button
						type="button"
						className="p-1 hover:bg-indigo-600 hover:rounded-md"
						onClick={() => handleShapeButtonClick("rectangle")}
					>
						<SquareIcon width={"30px"} height={"30px"} />
					</button>
					<button
						type="button"
						className="p-1 hover:bg-indigo-600 hover:rounded-md"
					>
						<ArrowUpIcon width={"30px"} height={"30px"} />
					</button>
				</div>
			</div>
		</>
	);
}
