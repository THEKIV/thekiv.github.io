let coin_text = "The FARMX project offers users a unique opportunity to earn tokens through a convenient Android application and a Telegram bot. Participants can farm FARMX tokens by completing various tasks both in the application and in Telegram, which makes the process of earning income even more accessible. The intuitive interface of both tools allows everyone to easily start earning on the cryptocurrency market. Join the FARMX community and discover the possibilities of mobile farming and interaction via Telegram!";
document.getElementById("coin_text_name").textContent = "FARMX";
document.getElementById("coin_text").textContent = coin_text;

// Изменение скина COIN
function change_coin(text) {
	try {
		if (text == 0) {
			let coin_text = "The FARMX project offers users a unique opportunity to earn tokens through a convenient Android application and a Telegram bot. Participants can farm FARMX tokens by completing various tasks both in the application and in Telegram, which makes the process of earning income even more accessible. The intuitive interface of both tools allows everyone to easily start earning on the cryptocurrency market. Join the FARMX community and discover the possibilities of mobile farming and interaction via Telegram!";
			document.getElementById("coin_text_name").textContent = "FARMX";
			document.getElementById("coin_text").textContent = coin_text;
		};
		if (text == 1) {
			let coin_text = "The DEVIL COIN this is a crypto token that represents power and strength in the crypto world. This token is created for those who are ready to take risks and strive for success in investments. DEVIL is not just a symbol of evil, but also a symbol of ambition, courage and determination. Be ready to take on the challenge and conquer your financial goals with DEVIL.";
			document.getElementById("coin_text_name").textContent = "DEVILCOIN";
			document.getElementById("coin_text").textContent = coin_text;
		};
	} catch {
		console.log("Ошибка!");
	};
};