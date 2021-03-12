<script>
	export let color = "var(--primary)";
</script>

<div class="spin-loader">
	<div style="background-color:{color};" />
	<div style="background-color:{color};" />
	<div style="background-color:{color};" />
	<div style="background-color:{color};" />
</div>

<style>
	.spin-loader {
		display: inline-block;
		position: relative;
		width: 50px;
		/* margin: 0 auto; */
		max-width: 100%;
		min-width: 0%;
		height: 9px;
	}
	.spin-loader div {
		position: absolute;
		top: 0;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.spin-loader div:nth-child(1) {
		/* background-color: red; */
		left: 0%;
		animation: spin-loader1 0.6s infinite;
	}
	.spin-loader div:nth-child(2) {
		/* background-color: blue; */
		left: 0%;
		animation: spin-loader2 0.6s infinite;
	}
	.spin-loader div:nth-child(3) {
		/* background-color: red; */
		right: 45%;
		animation: spin-loader2-1 0.6s infinite;
	}
	.spin-loader div:nth-child(4) {
		right: 0%;
		animation: spin-loader3 0.6s infinite;
	}
	@keyframes spin-loader1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes spin-loader3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes spin-loader2 {
		0% {
			left: 0%;
		}
		100% {
			left: 45%;
		}
	}
	@keyframes spin-loader2-1 {
		0% {
			right: 45%;
		}
		100% {
			right: 0%;
		}
	}
</style>
