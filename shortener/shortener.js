document.addEventListener("DOMContentLoaded", event => {
    document.getElementById("form").addEventListener("submit", async e => {
        e.preventDefault();

        const dest = document.getElementById("dest").value;
        const key = document.getElementById("key").value;
        const code = document.getElementById("code").value;
        const p = document.getElementById("p");
        const a = document.getElementById("a");

        if (!dest) return;

        let waiting = true;
        setTimeout(() => {
            const span = document.getElementById("toolong");
            if (waiting)
                span.innerHTML =
                    'Taking too long? The server may be down. Check out the status <a href="https://status.karesz.xyz" target="_blank">here</a>.';
        }, 8000);

        p.innerHTML =
            '<span id="loading">Loading.</span><br><span id="toolong"></span>';
        a.innerText = "";
        loading();

        const r = /^http(s|):\/\/krsz\.me($|\/.+$)/i;
        const url = "https://api.karesz.xyz";

        if (r.test(dest)) {
            // get stats of a link
            const res = await fetch(`${url}/shortener?code=${dest}`);
            if (!res.status.toString().startsWith("2")) {
                console.error(res);
                if (res.status == 404)
                    p.innerText = "That url was not found. 🤦‍♂️";
                else
                    p.innerText =
                        "The server encountered an error. Please try again later. 😫";
                return;
            }
            waiting = false;
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
            let b = { dest, key, code };

            const res = await fetch(`${url}/shortener`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(b),
            });
            if (!res.status.toString().startsWith("2")) {
                console.error(res);
                p.innerText =
                    "The server encountered an error. Please try again later. 😫";
                return;
            }
            waiting = false;
            const d = await res.json();
            const newUrl = d.created.url;
            a.innerText = newUrl;
            a.href = newUrl;
            p.innerText = `Your key is ${d.created.key}. You might need this later so try to remember it.`;
        }

        async function loading() {
            const span = document.getElementById("loading");
            while (waiting) {
                if (span.innerText == "Loading.") span.innerText = "Loading..";
                else if (span.innerText == "Loading..")
                    span.innerText = "Loading...";
                else if (span.innerText == "Loading...")
                    span.innerText = "Loading.";
                // setTimeout(loading(), 5000);
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    });
});
