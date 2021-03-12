<script>
	// import { slide } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { scale, slide } from "svelte/transition";
	import ToggleButtonTheme from "./Toggle-button-theme.svelte";

	export let service;
	let scrollY;

	// Show mobile icon and display menu
	let showMobileMenu = false;

	// List of navigation items
	const navItems = [
		{ label: "logo", href: "#" },
		{ label: "Item 1", href: "#" },
		{ label: "Item 2", href: "#" },
		{ label: "Item 3", href: "#" },
	];

	// Mobile menu click event handler
	const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

	$: if (showMobileMenu) {
		document.body.classList.add("noscroll");
		// document.body.classList.add("offsetCanvas");
	} else {
		document.body.classList.remove("noscroll");
		// document.body.classList.remove("offsetCanvas");
	}

	function fly(
		node,
		{
			delay = 0,
			duration = 400,
			easing: easing$1 = cubicOut,
			x = -100,
			y = 0,
		} = {}
	) {
		const style = getComputedStyle(node);
		const transform = style.transform === "none" ? "" : style.transform;
		return {
			delay,
			duration,
			easing: easing$1,
			css: (t) => `
			transform: ${transform} translate(${(1 - t) * x}%, ${(1 - t) * y}%);`,
		};
	}
</script>

<svelte:window bind:scrollY />

{#if showMobileMenu}
	<div class="menu" class:open={showMobileMenu} in:fly>
		<div class="menu__links">
			<div class="menu__wrapper-link">
				<a
					class="menu__link"
					class:active={$service.matches("init")}
					href=""
					on:click|preventDefault={() => {
						service.send("INIT");
						handleMobileIconClick();
					}}>inicio</a
				>
			</div>
			<div class="menu__wrapper-link">
				<a
					class="menu__link"
					class:active={$service.matches("middle")}
					href=""
					on:click|preventDefault={() => {
						service.send("MID");
						handleMobileIconClick();
					}}>productos</a
				>
			</div>
			<div class="menu__wrapper-link">
				<a
					class="menu__link"
					class:active={$service.matches("final")}
					href="#section-contact"
					on:click={() => {
						service.send("INIT");
						handleMobileIconClick();
					}}>social</a
				>
			</div>
		</div>
		<div class="menu__extra" in:scale={{ delay: 300, start: 0.98 }}>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum assumenda
			obcaecati culpa laudantium harum id officiis nulla incidunt voluptas quo
			explicabo inventore necessitatibus, temporibus nam est ducimus ratione
			adipisci cumque.
		</div>
	</div>
{/if}
<nav class="navbar" class:onTop={scrollY == 0}>
	<div class="container">
		<div class="navbar__wrapper">
			<div
				on:click={handleMobileIconClick}
				class="navbar__mobile-icon"
				class:active={showMobileMenu}
			>
				<div class="navbar__middle-line" />
			</div>

			<ul class="navbar__links">
				{#if $service.matches("middle") || $service.matches("final")}
					<li on:click={() => service.send("INIT")}>
						<svg viewBox="0 0 20 20">
							<path
								d="M15.971,7.708l-4.763-4.712c-0.644-0.644-1.769-0.642-2.41-0.002L3.99,7.755C3.98,7.764,3.972,7.773,3.962,7.783C3.511,8.179,3.253,8.74,3.253,9.338v6.07c0,1.146,0.932,2.078,2.078,2.078h9.338c1.146,0,2.078-0.932,2.078-2.078v-6.07c0-0.529-0.205-1.037-0.57-1.421C16.129,7.83,16.058,7.758,15.971,7.708z M15.68,15.408c0,0.559-0.453,1.012-1.011,1.012h-4.318c0.04-0.076,0.096-0.143,0.096-0.232v-3.311c0-0.295-0.239-0.533-0.533-0.533c-0.295,0-0.534,0.238-0.534,0.533v3.311c0,0.09,0.057,0.156,0.096,0.232H5.331c-0.557,0-1.01-0.453-1.01-1.012v-6.07c0-0.305,0.141-0.591,0.386-0.787c0.039-0.03,0.073-0.066,0.1-0.104L9.55,3.75c0.242-0.239,0.665-0.24,0.906,0.002l4.786,4.735c0.024,0.033,0.053,0.063,0.084,0.09c0.228,0.196,0.354,0.466,0.354,0.76V15.408z"
							/>
						</svg>
					</li>
					<!-- <a href="#">{"<"} volver</a> -->
				{/if}
				{#if $service.matches("middle") || $service.matches("final")}
					<li
						class:current={$service.matches("middle")}
						on:click={() => service.send("MID")}
					>
						<svg viewBox="0 0 20 20">
							<path
								d="M16.803,18.615h-4.535c-1,0-1.814-0.812-1.814-1.812v-4.535c0-1.002,0.814-1.814,1.814-1.814h4.535c1.001,0,1.813,0.812,1.813,1.814v4.535C18.616,17.803,17.804,18.615,16.803,18.615zM17.71,12.268c0-0.502-0.405-0.906-0.907-0.906h-4.535c-0.501,0-0.906,0.404-0.906,0.906v4.535c0,0.502,0.405,0.906,0.906,0.906h4.535c0.502,0,0.907-0.404,0.907-0.906V12.268z M16.803,9.546h-4.535c-1,0-1.814-0.812-1.814-1.814V3.198c0-1.002,0.814-1.814,1.814-1.814h4.535c1.001,0,1.813,0.812,1.813,1.814v4.534C18.616,8.734,17.804,9.546,16.803,9.546zM17.71,3.198c0-0.501-0.405-0.907-0.907-0.907h-4.535c-0.501,0-0.906,0.406-0.906,0.907v4.534c0,0.501,0.405,0.908,0.906,0.908h4.535c0.502,0,0.907-0.406,0.907-0.908V3.198z M7.733,18.615H3.198c-1.002,0-1.814-0.812-1.814-1.812v-4.535c0-1.002,0.812-1.814,1.814-1.814h4.535c1.002,0,1.814,0.812,1.814,1.814v4.535C9.547,17.803,8.735,18.615,7.733,18.615zM8.64,12.268c0-0.502-0.406-0.906-0.907-0.906H3.198c-0.501,0-0.907,0.404-0.907,0.906v4.535c0,0.502,0.406,0.906,0.907,0.906h4.535c0.501,0,0.907-0.404,0.907-0.906V12.268z M7.733,9.546H3.198c-1.002,0-1.814-0.812-1.814-1.814V3.198c0-1.002,0.812-1.814,1.814-1.814h4.535c1.002,0,1.814,0.812,1.814,1.814v4.534C9.547,8.734,8.735,9.546,7.733,9.546z M8.64,3.198c0-0.501-0.406-0.907-0.907-0.907H3.198c-0.501,0-0.907,0.406-0.907,0.907v4.534c0,0.501,0.406,0.908,0.907,0.908h4.535c0.501,0,0.907-0.406,0.907-0.908V3.198z"
							/>
						</svg>
						<span>productos</span>
					</li>
					<!-- <li on:click={() => service.send("MID")}>productos</li> -->
					<!-- <a href="#">{"<"} volver</a> -->
				{/if}
				{#if $service.matches("final")}
					<li class="current"><slot /></li>
				{/if}
			</ul>

			<button class="navbar__btn-theme">
				<ToggleButtonTheme />
				<!-- <svg viewBox="0 0 20 20">
					<path
						d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
			c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
			s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
			c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
					/>
				</svg> -->
			</button>
		</div>
	</div>
</nav>

<!-- <hr /> -->
<style lang="scss">
	$navbar-height: 45px;

	// menu section

	.menu {
		position: fixed;
		top: 0%;
		left: 0%;
		height: 100%;
		max-width: 100%;
		min-width: 100%;
		z-index: 18;

		display: flex;
		flex-basis: 100%;
		justify-content: center;
		align-items: center;
		flex-direction: row;

		text-align: left;
		transform: none;

		@include media(">=tablet") {
		}
	}

	.menu__links,
	.menu__extra {
		padding: $navbar-height 0.5em;
		height: 100%;
	}

	.menu__links {
		flex-basis: 100%;
		min-width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: var(--navbar-bg-links);

		@include media(">=tablet") {
			min-width: (100% / 3);
			flex-basis: auto;
		}
	}

	.menu__extra {
		display: none;

		flex-basis: auto;
		justify-content: flex-start;
		align-items: center;
		background-color: var(--navbar-bg-extra);

		@include media(">=tablet") {
			display: flex;
			// flex-basis: auto;
		}
	}

	.menu__wrapper-link {
		overflow: hidden;
		width: 60%;

		&:hover {
			.menu__link {
				color: var(--navbar-color-link-hover);
			}
		}
	}

	.menu__link {
		font-weight: 900;
		width: 100%;
		display: block;
		color: var(--navbar-color-link);
		font-size: 2rem;
		text-decoration: none;
		// transform: translateY(100%);
		// transition: transform 0.6;

		@include media(">=tablet") {
			font-size: 1.5rem;
		}
	}

	.menu__wrapper-link:nth-child(1) .menu__link {
		transition: transform 0.5s 300ms;
	}
	.menu__wrapper-link:nth-child(2) .menu__link {
		transition: transform 0.5s 400ms;
	}
	.menu__wrapper-link:nth-child(3) .menu__link {
		transition: transform 0.5s 500ms;
	}

	.active {
		color: var(--primary);

		&::before {
			content: "_";
			color: white;
			font-size: 1.2rem;
		}
	}

	.menu {
		& + .navbar {
			background: transparent;
			box-shadow: none;
		}
	}
	.open {
		& + .navbar .navbar__links {
			display: none;
		}
	}

	// extra section

	.navbar {
		position: fixed;
		top: -1px;
		left: 0;
		width: 100%;
		color: var(--navbar-color);
		background: var(--navbar-bg);
		z-index: 20;
		box-shadow: 0 1px 2px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 7%),
			0 4px 8px rgb(0 0 0 / 7%), 0 8px 16px rgb(0 0 0 / 7%),
			0 16px 32px rgb(0 0 0 / 7%), 0 32px 64px rgb(0 0 0 / 7%);
	}

	.navbar__wrapper {
		padding: 0 var(--space-x);

		display: flex;
		align-items: center;
		justify-content: space-between;
		height: $navbar-height;

		// @include media(">=small") {
		// 	padding-left: 1.5em;
		// 	padding-right: 1.5em;
		// }
		// @include media(">=tablet") {
		// 	padding: 0;
		// }
	}

	// modification

	.onTop {
		box-shadow: none;
		color: var(--navbar-color-top);
		background: var(--bg-navbar-top);

		.navbar__mobile-icon:after,
		.navbar__mobile-icon:before,
		.navbar__middle-line {
			background-color: var(--navbar-icon-menu-top);
		}
	}

	// .navbar__links {
	// 	flex-grow: 0;
	// 	flex-shrink: 1;
	// 	// height: 100%;
	// 	// a {
	// 	// 	padding: 0 0.3em;
	// 	// 	display: inline-block;
	// 	// 	color: white;
	// 	// }
	// 	// background-color: blue;
	// 	width: 100%;
	// 	max-width: 80%;
	// }

	.navbar__links {
		display: flex;
		justify-content: center;
		flex-basis: 100%;
		min-width: 0px;
		margin: 0 1em;
		list-style: none;

		@include media(">=phone") {
			margin: 0 2em;
		}
		// background-color: rgba(255, 0, 0, 0.05);
	}

	.navbar__links li {
		padding: 0;
		margin: 0;
		white-space: nowrap;
		font-weight: 300;
		height: 100%;
		cursor: pointer;
		user-select: none;
	}
	.navbar__links li:not(.current):hover {
		opacity: 0.6;
	}
	.navbar__links li:not(.current):active {
		color: var(--primary-opacity-9);
	}
	.navbar__links span {
		display: none;
		padding: 0 0.2em;

		@include media(">=phone") {
			display: initial;
		}
	}
	.navbar__links svg {
		// height: 100%;
		// width: auto;
		pointer-events: none;
	}

	.current {
		color: var(--primary);
	}
	.current:hover {
		cursor: initial;
	}

	.navbar__links li:nth-child(1) {
		// background-color: blue;
	}
	.navbar__links li:nth-child(2) {
	}
	.navbar__links li:nth-last-child(1) {
	}

	.navbar__links li:nth-child(3) {
		// max-width: auto;
		min-width: 0px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		// background-color: red;
	}
	// .navbar__links a {
	// }

	.navbar__links li::before {
		// content: "|";
		// content: "•";
		opacity: 0.5;
		// content: "/";
		content: "→";
		// content: ">";
		padding: 0 0.4em;
		// transition: padding 0.3s;
	}

	li:hover ~ li::before {
		content: "←";
		// font-weight: 700;
		// padding: 0 0.7em;
	}

	.navbar__links li:first-child::before {
		content: "";
		padding: 0;
	}

	// hr {
	// 	border: none;
	// 	outline: none;
	// 	width: 80%;
	// 	height: 1px;
	// 	background-color: var(--primary-opacity-1);
	// 	margin: 0 auto;
	// 	padding: 0;
	// }

	// .inner {
	// 	max-width: 980px;
	// 	margin: auto;
	// 	box-sizing: border-box;
	// }

	.navbar__btn-theme {
		// min-width: 25px;
		padding: 0;
		margin: 0;
		border-color: transparent;
		outline: none;
		// background-color: red;
	}

	.navbar__mobile-icon {
		min-width: 25px;
		height: 14px;
		position: relative;
		cursor: pointer;
		margin-right: 28px;
	}

	.navbar__mobile-icon:after,
	.navbar__mobile-icon:before,
	.navbar__middle-line {
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		background-color: var(--navbar-icon-menu);
		opacity: 1;
		transition: all 0.4s;
		transform-origin: center;
	}

	.navbar__mobile-icon:before,
	.navbar__middle-line {
		top: 0;
	}

	.navbar__mobile-icon:after,
	.navbar__middle-line {
		bottom: 0;
	}

	.navbar__mobile-icon:before {
		width: 66%;
	}

	.navbar__mobile-icon:after {
		width: 33%;
	}

	.navbar__middle-line {
		margin: auto;
	}

	.navbar__mobile-icon:hover .navbar__middle-line {
		background-color: var(--primary);
	}

	.navbar__mobile-icon:hover:before,
	.navbar__mobile-icon:hover:after,
	.navbar__mobile-icon.active:before,
	.navbar__mobile-icon.active:after,
	.navbar__mobile-icon.active .navbar__middle-line {
		width: 100%;
		background-color: var(--primary);
	}

	.navbar__mobile-icon.active:before,
	.navbar__mobile-icon.active:after {
		top: 50%;
		transform: rotate(-45deg);
	}
	// .navbar__mobile-icon.active:before,
	.navbar__mobile-icon.active:after {
		top: 50%;
		transform: rotate(-45deg);
		opacity: 0;
	}

	.navbar__mobile-icon.active .navbar__middle-line {
		transform: rotate(45deg);
	}
</style>
