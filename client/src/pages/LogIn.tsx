import corner_logo from "../assets/corner_logo.png";
import corner_ui from "../assets/corner_ui.png";
import { motion } from "framer-motion";

type LogInProps = {
	handleLogIn: () => void;
};

export default function LogIn({ handleLogIn }: LogInProps) {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.8, duration: 0.4 }}
			>
				<div className="flex h-screen">
					<div className="w-1/3 md:w-1/2 flex justify-center">
						<div className="flex flex-col justify-between items-center">
							<div />
							<div className="w-full">
								<h1 className="text-6xl font-extrabold">Welcome Back</h1>
								<form className="w-full flex flex-col gap-4 mt-4">
									<div>
										<label
											htmlFor=""
											className="block text-xl font-semibold mb-2"
										>
											Username
										</label>
										<input
											type="text"
											className="block rounded-xl w-full py-4 px-5 bg-slate-200 text-black font-medium text-lg"
										/>
									</div>

									<div>
										<label
											htmlFor=""
											className="block text-xl font-semibold mb-2"
										>
											Password
										</label>
										<input
											type="password"
											className="block rounded-xl w-full py-4 px-5 text-black font-medium text-lg bg-slate-200"
										/>
									</div>

									<div className="flex gap-5 w-full justify-between">
										<button
											type="button"
											className="text-lg font-bold bg-indigo-600 px-20 py-3 rounded-xl"
											onClick={handleLogIn}
										>
											Log In
										</button>
										<button
											type="button"
											className="text-lg font-bold bg-transparent border-solid border-2 border-indigo-600 px-20 py-3 rounded-xl"
										>
											Register
										</button>
									</div>
								</form>
							</div>
							<img className="w-48 mb-16" src={corner_logo} alt="" />
						</div>
					</div>
					<div
						className="lg:mt-12 md:mt-6 bg-gradient-to-bl from-indigo-600 to-indigo-800 rounded-3xl relative"
						style={{ width: "55%", height: "95%" }}
					>
						<div className="pl-64 md:pl-40">
							<h1 className="font-header font-thick lg:text-9xl md:text-7xl text-transparent text-stroke pt-24">
								whatever your imagination desires
							</h1>
							<div className="flex mt-10">
								<h2 className="text-4xl font-bold bg-indigo-400 w-fit px-5 py-2 rounded-full">
									@Haroon
								</h2>
								<svg
									width="25"
									height="25"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Cursor Icon</title>
									<path
										d="M3.29227 0.048984C3.47033 -0.032338 3.67946 -0.00228214 3.8274 0.125891L12.8587 7.95026C13.0134 8.08432 13.0708 8.29916 13.0035 8.49251C12.9362 8.68586 12.7578 8.81866 12.5533 8.82768L9.21887 8.97474L11.1504 13.2187C11.2648 13.47 11.1538 13.7664 10.9026 13.8808L8.75024 14.8613C8.499 14.9758 8.20255 14.8649 8.08802 14.6137L6.15339 10.3703L3.86279 12.7855C3.72196 12.934 3.50487 12.9817 3.31479 12.9059C3.1247 12.8301 3 12.6461 3 12.4414V0.503792C3 0.308048 3.11422 0.130306 3.29227 0.048984ZM4 1.59852V11.1877L5.93799 9.14425C6.05238 9.02363 6.21924 8.96776 6.38319 8.99516C6.54715 9.02256 6.68677 9.12965 6.75573 9.2809L8.79056 13.7441L10.0332 13.178L8.00195 8.71497C7.93313 8.56376 7.94391 8.38824 8.03072 8.24659C8.11753 8.10494 8.26903 8.01566 8.435 8.00834L11.2549 7.88397L4 1.59852Z"
										fill="currentColor"
										fill-rule="evenodd"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						</div>
						<img
							className="absolute bottom-0 right-0"
							width={"88%"}
							src={corner_ui}
							alt=""
						/>
					</div>
				</div>
			</motion.div>
		</>
	);
}
