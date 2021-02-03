<style>
	.spin-loader {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.spin-loader div {
		position: absolute;
		top: 33px;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--primary);
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.spin-loader div:nth-child(1) {
		left: 8px;
		animation: spin-loader1 0.6s infinite;
	}
	.spin-loader div:nth-child(2) {
		left: 8px;
		animation: spin-loader2 0.6s infinite;
	}
	.spin-loader div:nth-child(3) {
		left: 32px;
		animation: spin-loader2 0.6s infinite;
	}
	.spin-loader div:nth-child(4) {
		left: 56px;
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
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
</style>

<div class="spin-loader">
	<div />
	<div />
	<div />
	<div />
</div>
