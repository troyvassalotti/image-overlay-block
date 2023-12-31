import { LitElement, html, css } from 'lit';

class ImageOverlay extends LitElement {
	static styles = css`
		* {
			box-sizing: border-box;
		}

		*::after,
		*::before {
			box-sizing: inherit;
		}

		:host {
			display: block;
			inline-size: fit-content;
		}

		::slotted( img ) {
			block-size: 100%;
			display: block;
			inline-size: auto;
			margin-inline: auto;
			max-inline-size: 100%;
			object-fit: cover;
		}

		.figure {
			block-size: 100%;
			margin: 0;
			position: relative;
		}

		.caption {
			display: grid;
			inset: 0;
			opacity: 0;
			overflow: auto;
			place-items: center;
			position: absolute;
			transition: 0.3s ease;
		}

		.caption:focus-within,
		.caption:hover {
			background-color: hsl( 0 0% 0% / 0.5 );
			opacity: 1;
		}

		.content {
			inline-size: 100%;
		}
	`;

	render() {
		return html`
			<figure class="figure">
				<slot name="image"></slot>
				<figcaption class="caption" tabindex="0">
					<div class="content">
						<slot></slot>
					</div>
				</figcaption>
			</figure>
		`;
	}
}

customElements.define( 'image-overlay', ImageOverlay );
