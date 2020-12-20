function redir(t) {
	switch (t) {
		case "bruh":
			window.location.href = "./bruh/index.html";
			break;
		case "karesz":
			window.location.href = "./karesz/index.html";
			break;

		default:
			console.error("invalid redirect");
			alert("invalid redirect");
			break;
	}
}
