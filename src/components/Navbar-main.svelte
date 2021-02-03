<script>
	let isOpen = false;

	function scrollLock() {
		const body = document.body;
		body.classList.toggle("stop-scrolling");
	}
</script>

<style>
	@keyframes in-slide-fade-menu {
		0% {
			opacity: 0;
			transform: translateY(-100%);
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
			transform: translateY(0%);
		}
	}
	.header {
		position: -webkit-sticky;
		position: sticky;
		z-index: 9999999999;
		top: 0;
		/* width: 100%; */
		width: 100%;
		/* height: 100%; */
		/* height: auto; */
		background-color: var(--primary-opacity-6);
		/* background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) 80%); */
		/* background-repeat: no-repeat, no-repeat; */
		/* background-size: contain; */
		/* background-position: center, center; */
		/* transition: all 0.6s; */
	}
	.full-screen {
		background-color: var(--secondary-opacity-9);
		/* background: linear-gradient(var, rgba(0, 0, 0, 0.8) 80%); */
		/* height: 100vh; */
		/* position: fixed; */
		/* width: 100%; */
	}
	.container {
		padding: 1.5em;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.logo {
		/* background-color: rgba(144, 238, 144, 0.1); */
		/* margin: 0 auto; */
		/* width: 3em; */
	}

	.logo img {
		height: 48px;
		width: auto;
		display: block;
	}

	.menu {
		margin-top: 2em;
		display: none;
		width: 100%;
		/* margin-left: auto; */
		/* background-color: rgba(144, 238, 144, 0.1); */
		text-align: right;
		/* font-size: 3.25rem; */
		/* width: 50%; */
		/* transform: translateY(-100%); */
		transition: max-height 0.6s;
	}

	.menu a {
		display: inline-block;
		/* display: none; */
		width: 100%;
		font-size: 2.5rem;
		font-weight: 900;
		line-height: 2;
		color: var(--primary);
		/* background-color: tomato; */
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		margin-left: auto;
		color: #ff6969;
		border-radius: 50px;
		/* padding: 0.5em; */
		/* width: auto;
		height: 100%; */
		padding: 0.7em;
		cursor: pointer;

		/* width: 100%; */
		/* height: 48px; */
		background-color: transparent;
		/* background-color: rgba(255, 105, 105, 0.2); */
		border: none;
		/* border: 1px solid #ff6969; */
		outline: 0;
	}
	button:hover {
		background-color: rgba(255, 105, 105, 0.2);
	}

	.icon-open {
		min-width: 1.8em;
		height: 1.8em;
		/* background-color: rgba(255, 105, 105, 0.2); */
		/* border-radius: 50px; */
	}
	.icon-close {
		min-width: 1.5em;
		height: 1.5em;
		/* padding-right: 1em; */
		/* background-color: rgba(255, 105, 105, 0.2); */
		/* border-radius: 50px; */
	}
	hr {
		border: 0;
		width: 100%;
		height: 1px;
		background-color: rgba(224, 255, 255, 0.1);
		/* margin-top: 2em; */
	}

	.show-menu {
		display: initial;
		transform: translateY(0%);
		animation: in-slide-fade-menu 0.6s;
	}

	@media (min-width: 640px) {
	}

	@media (min-width: 768px) {
		.full-screen {
			background: none;
			height: auto;
			position: initial;
		}
		button {
			display: none;
		}

		.menu {
			/* display: none; */
			margin-left: 0 !important;
			display: initial;
			margin-left: auto;
			/* background-color: rgba(144, 238, 144, 0.1); */
			/* width: 50%; */
			text-align: center;
		}

		.menu a {
			max-width: 100px;
			padding-right: 0.5em;
			padding-left: 0.5em;
			margin: 0 1em;
			font-size: 1rem;
			font-weight: initial;
		}
	}
	@media (min-width: 1024px) {
	}
	@media (min-width: 1280px) {
	}
</style>

<div class="header" class:full-screen={isOpen}>
	<div class="container">
		<hr />
		<div class="logo" on:click>
			<img src="/consweet-logo-web.svg" alt="logo-img" />
		</div>
		<button
			on:click={() => {
				isOpen = !isOpen;
				scrollLock();
			}}>
			{#if !isOpen}
				<svg class="svg-reset icon-open" viewBox="0 0 20 20">
					<path
						fill="current"
						d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
					/>
				</svg>
			{:else}
				<svg class="svg-reset icon-close" viewBox="0 0 20 20">
					<path
						fill="current"
						d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
							c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
							c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
							c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"
					/>
				</svg>
			{/if}
		</button>
		<div class="menu" class:show-menu={isOpen}>
			<a
				href="#section-products"
				on:click={() => {
					isOpen = !isOpen;
					scrollLock();
				}}>inicio</a
			>
			<a
				href="#section-contact"
				on:click={() => {
					isOpen = !isOpen;
					scrollLock();
				}}>contacto</a
			>
			<a
				href="#section-about"
				on:click={() => {
					isOpen = !isOpen;
					scrollLock();
				}}>acerca de</a
			>
		</div>
	</div>
</div>
