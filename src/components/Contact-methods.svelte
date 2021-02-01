<script>
	//? imports system
	//? imports components, store and function
	//? props
	//? variables
	//? Logic
</script>

<style>
	.contact-methods-wrapper {
		padding-top: 0.9em;
		padding-bottom: 2.5em;
		max-width: 600px;
	}
	.rrss-item {
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		/* padding: 1em 0; */
		/* margin: 0.2em 0; */
		border-bottom: 1px solid var(--primary-opacity-2);
		cursor: pointer;
		/* background-color: var(--primary-opacity-1); */
		/* border-radius: 10px; */
	}
	.link {
		padding: 1em 0;
		width: 100%;
		height: 100%;
		color: inherit;
	}
	.link:link,
	.link:hover,
	.link:active {
		outline: none;
		text-decoration: none;
	}

	.rrss-item:active {
		background-color: var(--primary-opacity-1);
	}
	.rrss-icon {
		position: absolute;
		right: 0;
		top: 10px;
		min-width: 60px;
		min-height: 60px;
		margin-right: 1em;
	}
	.rrss-icon path {
		transition: all 0.3s ease-in-out;
		fill: var(--primary-opacity-2);
	}
	.label {
		font-weight: 300;
		/* font-size: 1em; */
		font-size: 1em;
	}
	.rrss-item:hover .label {
		/* font-weight: 700; */
		color: var(--primary);
		/* border-bottom: 1px solid var(--primary); */
	}

	.tool-item {
		margin: 0 0.3em;
	}

	.tool-icon {
		min-width: 15px;
		min-height: 15px;
	}
	.tool-icon path {
		fill: var(--primary);
	}

	@media (min-width: 640px) {
		.tool-item {
			display: none;
		}

		.link {
			padding: 1em 0 1em 1em;
		}

		.rrss-item:hover .rrss-icon path {
			fill: var(--primary-opacity-4);
		}
		.rrss-item:hover .tool-item {
			display: inline-block;
		}
		.label {
			font-size: 1.2em;
		}
	}

	@media (min-width: 768px) {
	}

	@media (min-width: 1024px) {
	}

	@media (min-width: 1280px) {
	}
</style>

<div class="contact-methods-wrapper">
	<div class="rrss-item">
		<a class="link" href="https://www.instagram.com/consweet.cl">
			<svg class="svg-reset rrss-icon" viewBox="0 0 24 24">
				<path
					fill="current"
					d="M12,1.3c3.5,0,3.9,0,5.3,0.1c3.5,0.2,5.2,1.8,5.4,5.4c0.1,1.4,0.1,1.8,0.1,5.3c0,3.5,0,3.9-0.1,5.3
        c-0.2,3.5-1.8,5.2-5.4,5.4c-1.4,0.1-1.8,0.1-5.3,0.1c-3.5,0-3.9,0-5.3-0.1c-3.6-0.2-5.2-1.9-5.4-5.4c-0.1-1.4-0.1-1.8-0.1-5.3
        c0-3.5,0-3.9,0.1-5.3c0.2-3.5,1.8-5.2,5.4-5.4C8.1,1.3,8.5,1.3,12,1.3z M12,0C8.7,0,8.3,0,7.1,0.1c-4.4,0.2-6.8,2.6-7,7
        C0,8.3,0,8.7,0,12s0,3.7,0.1,4.9c0.2,4.4,2.6,6.8,7,7C8.3,24,8.7,24,12,24s3.7,0,4.9-0.1c4.4-0.2,6.8-2.6,7-7C24,15.7,24,15.3,24,12
        s0-3.7-0.1-4.9c-0.2-4.4-2.6-6.8-7-7C15.7,0,15.3,0,12,0z M12,5.8c-3.4,0-6.2,2.8-6.2,6.2s2.8,6.2,6.2,6.2s6.2-2.8,6.2-6.2
        C18.2,8.6,15.4,5.8,12,5.8z M12,17.1c-2.8,0-5.1-2.3-5.1-5.1c0-2.8,2.3-5.1,5.1-5.1s5.1,2.3,5.1,5.1C17.1,14.8,14.8,17.1,12,17.1z
        M18.6,4.4c-0.6,0-1,0.4-1,1s0.4,1,1,1c0.6,0,1-0.4,1-1S19.1,4.4,18.6,4.4z" />
			</svg>
			<span class="label">consweet.cl<span class="tool-item"><svg
						class="svg-reset tool-icon"
						viewBox="0 0 24 24">
						<path
							fill="current"
							d="M16.76,7.51l-5.199-5.196c-0.234-0.239-0.633-0.066-0.633,0.261v2.534c-0.267-0.035-0.575-0.063-0.881-0.063c-3.813,0-6.915,3.042-6.915,6.783c0,2.516,1.394,4.729,3.729,5.924c0.367,0.189,0.71-0.266,0.451-0.572c-0.678-0.793-1.008-1.645-1.008-2.602c0-2.348,1.93-4.258,4.303-4.258c0.108,0,0.215,0.003,0.321,0.011v2.634c0,0.326,0.398,0.5,0.633,0.262l5.199-5.193C16.906,7.891,16.906,7.652,16.76,7.51 M11.672,12.068V9.995c0-0.185-0.137-0.341-0.318-0.367c-0.219-0.032-0.49-0.05-0.747-0.05c-2.78,0-5.046,2.241-5.046,5c0,0.557,0.099,1.092,0.292,1.602c-1.261-1.111-1.979-2.656-1.979-4.352c0-3.331,2.77-6.041,6.172-6.041c0.438,0,0.886,0.067,1.184,0.123c0.231,0.043,0.441-0.134,0.441-0.366V3.472l4.301,4.3L11.672,12.068z" />
					</svg></span></span>
		</a>
	</div>
	<div class="rrss-item">
		<a class="link" href="https://wa.me/56931364370">
			<svg class="svg-reset rrss-icon" viewBox="0 0 24 24">
				<path
					fill="current"
					d="M0.1,24l1.7-6.2c-1-1.8-1.6-3.8-1.6-5.9C0.2,5.3,5.5,0,12,0c3.2,0,6.2,1.2,8.4,3.5c2.2,2.2,3.5,5.2,3.5,8.4
				c0,6.6-5.3,11.9-11.9,11.9c-2,0-4-0.5-5.7-1.4C6.4,22.3,0.1,24,0.1,24z M6.3,21.3c1.9,1.1,3.4,1.6,5.7,1.6c6.1,0,11-4.9,11-11
				c0-6.1-4.9-11-11-11c-6.1,0-11,4.9-11,11c0,2.5,0.5,3.9,1.7,5.9l-1.5,5C1.3,22.8,6.3,21.3,6.3,21.3z" />
				<path
					fill="current"
					d="M15.1,17.2c-0.4,0-0.7-0.1-1-0.2c-0.4-0.1-1-0.3-1.7-0.6c-2.3-1-4-3.1-4.9-4.3l-0.1-0.1c-0.3-0.4-1.1-1.6-1.1-2.8
				C6.4,8,7,7.4,7.3,7.1c0.3-0.3,0.5-0.3,0.6-0.3l0.7,0c0,0,0.1,0,0.2,0.3L9,7.8c0.3,0.7,0.6,1.4,0.6,1.5c0.1,0.1,0,0.1,0,0.2l0,0.1
				C9.5,9.7,9.5,9.8,9.4,9.9l-0.2,0.2c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.5,0.5-0.2,1.1c0.2,0.4,0.8,1.4,1.7,2.2
				c1,0.9,1.9,1.3,2.3,1.5c0.1,0,0.1,0.1,0.2,0.1c0.2,0.1,0.3,0.1,0.5,0.1c0.2,0,0.4-0.1,0.6-0.3c0.1-0.2,0.8-0.9,1-1.2c0,0,0,0,0.1,0
				c0,0,0.1,0,0.1,0c0.2,0.1,1.5,0.7,2,0.9l0.2,0.1c0.1,0,0.2,0.1,0.3,0.1c0,0,0,0.5-0.2,1c-0.2,0.5-1.2,1.1-1.7,1.2
				C15.6,17.2,15.4,17.2,15.1,17.2L15.1,17.2z" />
			</svg>
			<span class="label">+56 9 3136 4370<span class="tool-item"><svg
						class="svg-reset tool-icon"
						viewBox="0 0 24 24">
						<path
							fill="current"
							d="M16.76,7.51l-5.199-5.196c-0.234-0.239-0.633-0.066-0.633,0.261v2.534c-0.267-0.035-0.575-0.063-0.881-0.063c-3.813,0-6.915,3.042-6.915,6.783c0,2.516,1.394,4.729,3.729,5.924c0.367,0.189,0.71-0.266,0.451-0.572c-0.678-0.793-1.008-1.645-1.008-2.602c0-2.348,1.93-4.258,4.303-4.258c0.108,0,0.215,0.003,0.321,0.011v2.634c0,0.326,0.398,0.5,0.633,0.262l5.199-5.193C16.906,7.891,16.906,7.652,16.76,7.51 M11.672,12.068V9.995c0-0.185-0.137-0.341-0.318-0.367c-0.219-0.032-0.49-0.05-0.747-0.05c-2.78,0-5.046,2.241-5.046,5c0,0.557,0.099,1.092,0.292,1.602c-1.261-1.111-1.979-2.656-1.979-4.352c0-3.331,2.77-6.041,6.172-6.041c0.438,0,0.886,0.067,1.184,0.123c0.231,0.043,0.441-0.134,0.441-0.366V3.472l4.301,4.3L11.672,12.068z" />
					</svg></span></span>
		</a>
	</div>
	<div class="rrss-item">
		<a class="link" href="https://www.instagram.com/consweet.cl">
			<svg class="svg-reset rrss-icon" viewBox="0 0 24 24">
				<path
					fill="current"
					d="M22.3,21H1.7C0.8,21,0,20.2,0,19.3V5.7C0,4.8,0.8,4,1.7,4h20.6C23.2,4,24,4.8,24,5.7v13.6
				C24,20.2,23.2,21,22.3,21z M12,13.8L1.6,6.3l0,14.1h20.7l0-14.1C22.3,6.3,12,13.8,12,13.8z M21.9,4.5H2l10,7
				C12,11.5,19,6.6,21.9,4.5z" />
			</svg>
			<span class="label">consweetdelicias@gmail.com
				<span class="tool-item"><svg
						class="svg-reset tool-icon"
						viewBox="0 0 24 24">
						<path
							fill="current"
							d="M17.3,2.2H4.6c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5h12.2v12.2c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V2.7
							C17.8,2.4,17.6,2.2,17.3,2.2z M15.4,4.1H2.7c-0.3,0-0.5,0.2-0.5,0.5v12.7c0,0.3,0.2,0.5,0.5,0.5h12.7c0.3,0,0.5-0.2,0.5-0.5V4.6
							C15.9,4.4,15.6,4.1,15.4,4.1z M14.9,16.3c0,0.3-0.2,0.5-0.5,0.5H3.7c-0.3,0-0.5-0.2-0.5-0.5V5.6c0-0.3,0.2-0.5,0.5-0.5h10.7
							c0.3,0,0.5,0.2,0.5,0.5V16.3L14.9,16.3z" />
					</svg></span></span>
		</a>
	</div>
</div>
