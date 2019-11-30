export default function hsl2rgb({H, S, L}) {
	const C = (1 - Math.abs(2 * L - 1)) * S;
	const X = C * (1 - (Math.abs(((H / 60) % 2) - 1)));
	const m = L - 0.5 * C;

	let Rl, Gl, Bl;

	[Rl, Gl, Bl] = 
	(H >= 0 && H < 60)    ? [C, X, 0] :
	(H >= 60 && H < 120)  ? [X, C, 0] :
	(H >= 120 && H < 180) ? [0, C, X] :
	(H >= 180 && H < 240) ? [0, X, C] :
	(H >= 240 && H < 300) ? [X, 0, C] :
							[C, 0, X]

	const [R, G, B] = [
		Math.round((Rl + m) * 255), 
		Math.round((Gl + m) * 255), 
		Math.round((Bl + m) * 255)]

	return `rgb(${R}, ${G}, ${B})`
}
