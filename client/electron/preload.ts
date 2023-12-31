
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
	return new Promise((resolve) => {
		if (condition.includes(document.readyState)) {
			resolve(true)
		} else {
			document.addEventListener('readystatechange', () => {
				if (condition.includes(document.readyState)) {
					resolve(true)
				}
			})
		}
	})
}

const safeDOM = {
	append(parent: HTMLElement, child: HTMLElement) {
		if (!Array.from(parent.children).find(e => e === child)) {
			return parent.appendChild(child)
		}
	},
	remove(parent: HTMLElement, child: HTMLElement) {
		if (Array.from(parent.children).find(e => e === child)) {
			return parent.removeChild(child)
		}
	},
}


function useLoading() {
	const className = `<div class="sk-chase">
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
</div>`
	const styleContent = `
	 .sk-chase {

		width: 20px;
		height: 20px;
		position: relative;
		animation: sk-chase 2.5s infinite linear both;
	}

	.sk-chase-dot {

		width: 50px;
		height: 50px;
		position: absolute;
		left:45%;
		top: 45%;
		animation: sk-chase-dot 2.0s infinite ease-in-out both;
	}

	.sk-chase-dot:before {
		content: '';
		display: block;
		width: 25%;
		height: 25%;
		background-color: #fff;
		border-radius: 100%;
		animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
	}

	.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
	.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
	.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
	.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
	.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
	.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
	.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
	.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
	.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
	.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
	.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
	.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

	@keyframes sk-chase {
		100% { transform: rotate(360deg); }
	}

	@keyframes sk-chase-dot {
		80%, 100% { transform: rotate(360deg); }
	}

	@keyframes sk-chase-dot-before {
		50% {
			transform: scale(0.4);
		} 100%, 0% {
			transform: scale(1.0);
		}
	}
		.app-loading-wrap {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #100f1d;
			z-index: 9;
		}
				`
	const oStyle = document.createElement('style')
	const oDiv = document.createElement('div')

	oStyle.id = 'app-loading-style'
	oStyle.innerHTML = styleContent
	oDiv.className = 'app-loading-wrap'
	oDiv.innerHTML = `<div class="${className}"><div></div></div>`

	return {
		appendLoading() {
			safeDOM.append(document.head, oStyle)
			safeDOM.append(document.body, oDiv)
		},
		removeLoading() {
			safeDOM.remove(document.head, oStyle)
			safeDOM.remove(document.body, oDiv)
		},
	}
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)


let appLoaded = false;
let timeout = false;


setTimeout(() => {
	timeout = true;
	appLoaded && removeLoading();
}, 2999);


window.onmessage = (event) => {
	if (event.data.payload === 'removeLoading') {
		appLoaded = true;

		timeout && removeLoading();
	}
};