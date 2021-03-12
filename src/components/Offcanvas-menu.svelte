<script>
	// 	let navWidth = 0;
	export let navOpen = false;

	function handleNav(e) {
		navOpen = !navOpen;
		// 		navWidth === 0 ? navWidth = 40 : navWidth = 0;
	}

	// function handleNavWithKey(e) {
	// 	console.log(e.code);
	// 	if (e.code === "F1") {
	// 		navOpen = !navOpen;
	// 	}
	// }

	// 	const openNav = () => {
	// 		navOpen = !navOpen;
	// 		navWidth = 40;
	// 	}

	// 	const closeNav = () => {
	// 		navOpen = !navOpen;
	// 		navWidth = 0;
	// 	}

	$: if (navOpen) {
		document.body.classList.add("noscroll");
	} else {
		document.body.classList.remove("noscroll");
	}
</script>

<div id="mySidenav" class="sidenav" class:open={navOpen}>
	<a href="#a" class="closebtn" on:click={handleNav}>&times;</a>
	<a href="#b">Inicio</a>
	<a href="#c">Productos</a>
	<a href="#e">Contacto</a>
	<a href="#d">Social</a>
</div>

<!-- Use to open the sidenav -->
<!-- 	<span on:click={handleNav}>open</span> -->

<!-- Use Menu Icon to open the sidenav -->

<!-- <div class="container" class:change={navOpen} on:click={handleNav}>
	<div class="bar1" />
	<div class="bar2" />
	<div class="bar3" />
</div> -->
<style lang="scss">
	/* The side navigation menu */
	.sidenav {
		height: 100%;
		width: 100%; /* 0 width - change this with JavaScript */
		position: fixed;
		z-index: 999999999999999999999999999;
		top: 0;
		left: 0;
		background-color: hsla(23, 18%, 14%, 0.99);
		overflow: hidden; /* Disable horizontal scroll */
		padding-top: 3em;
		transform: translateX(-100%);
		transition: 0.5s;

		@include media(">=phone") {
			width: 80%; /* 0 width - change this with JavaScript */
		}
		@include media(">=tablet") {
			display: none;
		}
	}

	/* The navigation menu links */
	.sidenav a {
		padding: 8px 8px 8px 32px;
		text-decoration: none;
		font-size: 25px;
		color: #818181;
		display: block;
		transition: 0.3s;
	}

	/* When you mouse over the navigation links, change their color */
	.sidenav a:hover {
		color: #f1f1f1;
	}

	/* Position and style the close button (top right corner) */
	.sidenav .closebtn {
		position: absolute;
		top: 0;
		right: 25px;
		font-size: 36px;
		margin-left: 50px;
	}

	/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
	#main {
		/* transition: margin-left 0.5s; */
		padding: 20px;
	}

	.open {
		// width: 80%;
		transform: translateX(0%);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
			0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
	}

	/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
	@media screen and (max-height: 450px) {
		.sidenav {
			padding-top: 15px;
		}
		.sidenav a {
			font-size: 18px;
		}
	}
</style>
