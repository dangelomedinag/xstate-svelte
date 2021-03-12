<div>
	<input
		type="checkbox"
		class="checkbox"
		id="chk"
		on:click={() => {
			document.body.classList.toggle("light");
		}}
	/>
	<label class="label" for="chk">
		<i class="fas fa-sun" />
		<i class="fas fa-moon" />
		<div class="ball" />
	</label>
</div>

<style>
	div {
		position: relative;
	}

	.checkbox {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.label {
		background-color: #111;
		border-radius: 50px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		padding: 0.2em 0.4em;
	}

	.label .ball {
		background-color: #fff;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 23px;
		transform: translateX(0);
		transition: transform 0.2s linear;
	}

	.checkbox:checked + .label .ball {
		transform: translateX(calc(100% + 0.4em));
	}

	.label i:nth-child(1) {
		padding-right: 0.2em;
	}
	.label i:nth-child(2) {
		padding-left: 0.2em;
	}

	.fa-moon {
		/* padding-right: 0.2em; */
		color: #f1c40f;
	}

	.fa-sun {
		/* padding-left: 0.2em; */
		color: #f39c12;
	}
</style>
