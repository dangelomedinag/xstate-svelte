const DATE_UNITS = [
	["day", 86400],
	["hour", 3600],
	["minute", 60],
	["second", 1],
];
const rtf = new Intl.RelativeTimeFormat("es", { style: "short" });

export default (timestamp) => {
	// console.log(timestamp.toString().length)
	// if(timestamp.toString().length == 10) {
	// 	timestamp = timestamp * 1000;
	// }
	
	timestamp = timestamp * 1000;
	const now = Date.now();
	const elapsed = (timestamp - now) / 1000;

	for (const [unit, secondsInUnit] of DATE_UNITS) {
		if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
			const value = Math.floor(elapsed / secondsInUnit);
			return rtf.format(value, unit);
		}
	}
};