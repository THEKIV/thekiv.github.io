function bg_random() {
	const x = document.createElement("div");
	x.className = "x-letter";
	const size = ["15", "20", "25", "30"];
	const backgrounds = ["F", "A", "R", "M", "X", "$", "#"];
	bg_set_element = function() {
		let random_backgrounds = Math.floor(Math.random() * 11);
		x.textContent = backgrounds[random_backgrounds];
		let xSize = Math.floor(Math.random() * 4);
		x.style.fontSize = size[xSize] + "px";
		let randomX = Math.random() * window.innerWidth;
		let randomY = Math.random() * window.innerHeight;
		x.style.left = randomX + "px";
		x.style.top = randomY + "px";
		document.querySelector("#bg_container").appendChild(x);
	};
	requestAnimationFrame(bg_set_element);
	// Удаляем букву после полного исчезновения
	x.addEventListener("animationend", function() {
		x.style.animation = "bg_del 5s ease-out forwards running";
		setTimeout(function() {
			x.remove();
		}, 5000);
	});
};

// Генерируем BG
setInterval(bg_random, 100);