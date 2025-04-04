document.title = "FarmX";
window.resizeTo(480, 980);

// Запрет на просмотр исходного кода
try {
	document.addEventListener("contextmenu", event => {
		event.preventDefault();
	}, false);
	document.addEventListener("dragstart", event => {
		event.preventDefault();
	}, false);
	document.oncontextmenu = function() {
		return false;
	};
	document.onkeydown = function(e) {
		if (e.keyCode == 123) {
			return false;
		} else if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {  
			return false;  
		} else if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
			return false;
		} else if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
			return false;
		} else if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
			return false;
		// } else {
			// return false;
		};
	};
} catch {
	console.log("Ошибка!");
};

try {
	// Замена отсутствующего изображения
	document.querySelector("img").onerror = function() {
		// document.querySelector("img").style.display = 'none';
		document.querySelector("img").src = "./img/no_img.png"
		console.log("Ошибка!");
	};
} catch {
	console.log("Ошибка!");
};