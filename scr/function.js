// Открытие 
function home_open() {
	try {
		document.getElementById("home_box").style.display = "block";
		document.getElementById("info_box").style.display = "none";
		document.getElementById("coin_box").style.display = "none";
		document.getElementById("download_box").style.display = "none";
		document.getElementById("contact_box").style.display = "none";
	} catch {
		console.log("Ошибка!");
	};
};
function info_open() {
	try {
		document.getElementById("home_box").style.display = "none";
		document.getElementById("info_box").style.display = "block";
		document.getElementById("coin_box").style.display = "none";
		document.getElementById("download_box").style.display = "none";
		document.getElementById("contact_box").style.display = "none";
	} catch {
		console.log("Ошибка!");
	};
};
function coin_open() {
	try {
		document.getElementById("home_box").style.display = "none";
		document.getElementById("info_box").style.display = "none";
		document.getElementById("coin_box").style.display = "block";
		document.getElementById("download_box").style.display = "none";
		document.getElementById("contact_box").style.display = "none";
	} catch {
		console.log("Ошибка!");
	};
};
function download_open() {
	try {
		document.getElementById("home_box").style.display = "none";
		document.getElementById("info_box").style.display = "none";
		document.getElementById("coin_box").style.display = "none";
		document.getElementById("download_box").style.display = "block";
		document.getElementById("contact_box").style.display = "none";
		//
		app_size();
	} catch {
		console.log("Ошибка!");
	};
};
function contact_open() {
	try {
		document.getElementById("home_box").style.display = "none";
		document.getElementById("info_box").style.display = "none";
		document.getElementById("coin_box").style.display = "none";
		document.getElementById("download_box").style.display = "none";
		document.getElementById("contact_box").style.display = "block";
	} catch {
		console.log("Ошибка!");
	};
};

// Загрузка AutoFarm
function application_download() {
	try {
		// Указываем URL файла, который мы хотим скачать
		const fileUrl = "./download/FARMX.apk?nocache=true";
		// window.open(fileUrl, "_blank");
		// window.open(fileUrl, "_blank", "");
		// window.open(fileUrl, "FARMX.DOWNLOAD", "width=600, height=600");
	} catch {
		console.log("Ошибка!");
	};
};

// Загрузка Wallpaper
function wallpaper_download(text) {
	try {
		if (text == 1) {
			// Указываем URL файла, который мы хотим скачать
			const fileUrl = "./img/wallpaper/wallpaper_1.png?nocache=true";
		};
		if (text == 2) {
			// Указываем URL файла, который мы хотим скачать
			const fileUrl = "./img/wallpaper/wallpaper_2.png?nocache=true";
		};
		window.open(fileUrl, "_blank");
		// window.open(fileUrl, "_blank", "");
		// window.open(fileUrl, "FARMX.DOWNLOAD", "width=600, height=600");
	} catch {
		console.log("Ошибка!");
	};
};

function bytesToSize(bytes, decimals = 2) {
	try {
		if (typeof bytes !== "number" || isNaN(bytes)) {
			// throw new Error("Ошибка!");
			return 0;
		} else {
			if (bytes === 0) {
				return "0 BYTE.";
			} else {
				var dm = decimals < 0 ? 0 : decimals;
				var sizes = ["BYTE.", "KB.", "MB.", "GB.", "TB."];
				var index = Math.floor(Math.log(bytes) / Math.log(1024));
				return parseFloat((bytes / Math.pow(1024, index)).toFixed(dm)) + " " + sizes[index];
			};
		};
	} catch {
		console.log("Ошибка!");
	};
};

// Проверка размера приложения
function app_size() {
	try {
		if (localStorage.getItem("app_mode") == "web") {
			const url = "./download/FARMX.apk?nocache=true";
			fetch(url, {method: "HEAD"})
				.then(response => {
					// Проверяем, что ответ успешный (код 200)
					if (!response.ok) {
						throw new Error("Ошибка!");
					};
					// return response.json();
					return response.headers.get("Content-Length");
				})
				.then(data => {
					fileSize = data;
					// Выводим данные
					document.getElementById("size_application").textContent = "File size: " + bytesToSize(Number(fileSize));
				})
				.catch(error => {
					// console.log("Ошибка!");
					// Выводим данные
					document.getElementById("size_application").textContent = "File size: 0 BYTE.";
				});
		};
	} catch {
		console.log("Ошибка!");
	};
};

// Cлайдер скриншотов
function slider_screen() {
	try {
		if (localStorage.getItem("app_mode") == "web") {
			// Получаем элементы слайдера
			const slider = document.querySelector(".slider_box");
			const prevButton = document.querySelector(".prev-button");
			const nextButton = document.querySelector(".next-button");
			const slides = Array.from(slider.querySelectorAll("img"));
			const slideCount = slides.length;
			let slideIndex = 0;
			// Устанавливаем обработчики событий для кнопок
			prevButton.addEventListener("click", showPreviousSlide);
			nextButton.addEventListener("click", showNextSlide);
			// Функция для обновления отображения слайдера
			function updateSlider() {
				slides.forEach((slide, index) => {
					if (index === slideIndex) {
						slide.style.display = "block";
					} else {
						slide.style.display = "none";
					};
				});
			};
			// Функция для показа предыдущего слайда
			function showPreviousSlide() {
				slideIndex = (slideIndex - 1 + slideCount) % slideCount;
				updateSlider();
			};
			// Функция для показа следующего слайда
			function showNextSlide() {
				slideIndex = (slideIndex + 1) % slideCount;
				updateSlider();
			};
			// Инициализация слайдера
			updateSlider();
		};
	} catch {
		console.log("Ошибка!");
	};
};

function app_download_open() {
	try {
		document.getElementById("wallpaper_download_box").style.display = "none";
		document.getElementById("app_download_box").style.display = "block";
	} catch {
		console.log("Ошибка!");
	};
};

function wallpaper_download_open() {
	try {
		document.getElementById("app_download_box").style.display = "none";
		document.getElementById("wallpaper_download_box").style.display = "block";
	} catch {
		console.log("Ошибка!");
	};
};