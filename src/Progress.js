export function updateProgress() {
	const { scrollHeight, scrollTop } = document.documentElement;
	const scrollPercent = `${
		(scrollTop / (scrollHeight - window.innerHeight)) * 100
	}%`;
	document
		.querySelector("#progress-bar")
		.style.setProperty("--progress", scrollPercent);
}
export const progressBar = document.addEventListener("scroll", updateProgress);
