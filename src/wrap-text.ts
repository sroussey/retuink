import wrapAnsi from "wrap-ansi";
import cliTruncate from "cli-truncate";
import { type BaseProps } from "./baseProps.js";

const cache: Record<string, string> = {};

const wrapText = (
	text: string,
	maxWidth: number,
	wrapType: BaseProps["textWrap"],
): string => {
	const cacheKey = text + String(maxWidth) + String(wrapType);
	const cachedText = cache[cacheKey];

	if (cachedText) {
		return cachedText;
	}

	let wrappedText = text;

	if (wrapType === "overflow") {
		return wrappedText;
	}

	if (wrapType === "wrap") {
		wrappedText = wrapAnsi(text, maxWidth, {
			trim: false,
			hard: true,
		});
	}

	if (wrapType!.startsWith("truncate")) {
		let position: "end" | "middle" | "start" = "end";

		if (wrapType === "truncate-middle") {
			position = "middle";
		}

		if (wrapType === "truncate-start") {
			position = "start";
		}

		wrappedText = cliTruncate(text, maxWidth, { position });
	}

	cache[cacheKey] = wrappedText;

	return wrappedText;
};

export default wrapText;
