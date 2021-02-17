async function submit() {
    const dest = document.getElementById("dest").value;

    const res = await fetch("http://api.karesz.xyz/shortener", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({dest}),
    });
    const body = await res.json();
    const url = body.created.url;
    const output = document.getElementById("res");
    output.innerText = url;
    output.href = url;
}
