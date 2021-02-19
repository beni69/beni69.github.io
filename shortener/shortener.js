document.addEventListener("DOMContentLoaded", event => {
    document.getElementById("form").addEventListener("submit", async e => {
        e.preventDefault();

        const input = document.getElementById("dest").value;
        const p = document.getElementById("p");
        const a = document.getElementById("a");

        p.innerText = "";
        a.innerText = "";

        const r = /^http(s|):\/\/(krsz\.me|u\.karesz\.xyz)($|\/.+$)/i;

        if (r.test(input)) {
            // get stats of a link
            const res = await fetch(
                `http://api.karesz.xyz/shortener?code=${input}`
            );
            const d = await res.json();
            console.log(d);
            p.innerText = `
            Created at: ${new Date(d.timestamp).toLocaleString()}
            Clicks: ${d.clicks}
            Link: ${d.url}
            Destination: ${d.dest}
            `.trim();
        } else {
            // create a link
            const res = await fetch("http://api.karesz.xyz/shortener", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ dest: input }),
            });
            const body = await res.json();
            const url = body.created.url;
            a.innerText = url;
            a.href = url;
        }
    });
});
