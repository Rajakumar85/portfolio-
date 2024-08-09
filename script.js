let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};





var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type= "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid rgba(0, 0, 0, 0.01);}";
    document.body.appendChild(css);
}













Element.prototype.tilt = function (options) {

	// ----- config ----- //

	const config = {
		angle:            options?.angle            ?? 10,
		invert:           options?.invert           ?? false,
		perspective:      options?.perspective      ?? 1000,
		reset:            options?.reset            ?? true,
		scale:            options?.scale            ?? 1,
		transformElement: options?.transformElement ? this.querySelector(options.transformElement) : this,
		transitionEasing: options?.transitionEasing ?? 'cubic-bezier(.03, .98, .52, .99)',
		transitionSpeed:  options?.transitionSpeed  ?? 1500,
	};

	let timeout;


	// ----- functions ----- //

	const setTransition = (el, config) => {
		if (typeof config.transitionSpeed === 'number') {
			config.transformElement.style.transition = `transform ${config.transitionSpeed}ms ${config.transitionEasing}`;

			if (timeout !== undefined) clearTimeout(timeout);

			timeout = setTimeout(() => {
				config.transformElement.style.transition = '';
			}, config.transitionSpeed);
		}
	};

	const handleOver = (e, config) => {
		setTransition(this, config);

		if (typeof config.perspective === 'number') {
			this.style.setProperty('--tilt-perspective', `${config.perspective}px`);
		}

		if (typeof config.scale === 'number') {
			this.style.setProperty('--tilt-scale', `${config.scale}`);
		}
	};

	const handleMove = (e, config) => {
		let rect   = this.getBoundingClientRect();
		let x_pos  = Math.ceil(e.clientX - rect.left);
		let y_pos  = Math.ceil(e.clientY - rect.top);
		let w_half = rect.width / 2;
		let h_half = rect.height / 2;
		let x_rot  = config.angle / h_half * (h_half - y_pos);
		let y_rot  = config.angle / w_half * (w_half - x_pos);

		if (typeof config.invert === 'boolean' && config.invert) {
			x_rot *= -1;
			y_rot *= -1;
		}

		this.style.setProperty('--tilt-x', `${x_rot.toFixed(2) * -1}deg`);
		this.style.setProperty('--tilt-y', `${y_rot.toFixed(2)}deg`);
	};

	const handleOut = (e, config) => {
		this.style.setProperty('--tilt-scale', 1);

		if (typeof config.reset === 'boolean' && config.reset) {
			this.style.setProperty('--tilt-x', '0deg');
			this.style.setProperty('--tilt-y', '0deg');
		}

		setTransition(this, config);
	};


	// ----- events ----- //

	this.addEventListener('mouseover', e => handleOver(e, config));
	this.addEventListener('mousemove', e => handleMove(e, config));
	this.addEventListener('mouseout', e => handleOut(e, config));


	// ----- initial styles ----- //

	config.transformElement.style.willChange = 'transform';
	config.transformElement.style.transform = 'perspective(var(--tilt-perspective)) scale(var(--tilt-scale)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))';
};



document.querySelectorAll('[data-tilt]').forEach(el => {
	el.tilt({
	
	});
});







