document.addEventListener("DOMContentLoaded", event => {
    document.getElementById("form").addEventListener("submit", async e => {
        e.preventDefault();

        const url = "https://api.karesz.xyz";

        const input = document.getElementById("dest").value;
        const p = document.getElementById("p");
        const a = document.getElementById("a");

        p.innerText = "";
        a.innerText = "";

        const r = /^http(s|):\/\/krsz\.me($|\/.+$)/i;

        if (r.test(input)) {
            // get stats of a link
            const res = await fetch(`${url}/shortener?code=${input}`);
            if (!res.status.toString().startsWith("2")) {
                console.error(res);
                if (res.status == 404)
                    p.innerText = "That url was not found. 🤦‍♂️";
                else
                    p.innerText =
                        "The server encountered an error. Please try again later. 😫";
                return;
            }
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
            const res = await fetch(`${url}/shortener`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ dest: input }),
            });
            if (!res.status.toString().startsWith("2")) {
                console.error(res);
                p.innerText =
                    "The server encountered an error. Please try again later. 😫";
                return;
            }
            const d = await res.json();
            const url = d.created.url;
            a.innerText = url;
            a.href = url;
        }
    });
});
