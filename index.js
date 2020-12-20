function redir(t) {
	switch (t) {
		case "bruh":
			window.location.href = "./bruh/";
			break;
		case "karesz":
			window.location.href = "./karesz/";
			break;

		default:
			console.error("invalid redirect");
			alert("invalid redirect");
			break;
	}
}
