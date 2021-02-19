const html = document.getElementsByTagName("html")[0];

let playing = false;

const game = () => {
    if (playing) return;
    playing = true;
    const body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = "lightgreen";

    const h1 = document.getElementById("h1");
    h1.innerHTML = "Wait..";

    const wait = Math.random() * 5000;
    setTimeout(() => {
        const timerStart = new Date().getTime();
        const audio = new Audio("sickomode.mp3");
        audio.play();
        h1.innerHTML = "Click now!";
        body.style.backgroundColor = "red";

        html.onclick = () => {
            if (!playing) return;
            playing = false;
            const time = new Date().getTime() - timerStart;
            h1.innerHTML = `${time}ms`;
            body.style.backgroundColor = "lightblue";
            audio.pause();
            sendToDb(time);

            html.onclick = idle;
        };
    }, wait);
    return;

    async function sendToDb(time) {
        // global stats
        fetch("https://api.karesz.xyz/karesz/reaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ time: time }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));

        // local stats
        let results = JSON.parse(localStorage.getItem("results"));
        if (results == null) results = [];
        results.push(time);
        localStorage.setItem("results", JSON.stringify(results));
        localStorage.setItem("average", average(results));
        localStorage.setItem("max", max(results));
        localStorage.setItem("min", min(results));

        function average(array) {
            let sum = 0;
            array.forEach(item => (sum += item));
            return sum / array.length;
        }
        function max(array) {
            let best = -1;
            array.forEach(item => {
                if (item > best) best = item;
            });
            return best;
        }
        function min(array) {
            let best = Number.MAX_VALUE;
            array.forEach(item => {
                if (item < best) best = item;
            });
            return best;
        }
    }
};

const idle = () => {
    const body = document.getElementsByTagName("body")[0];
    const h1 = document.getElementById("h1");
    h1.innerHTML = "Click anywhere to start";
    body.style.backgroundColor = "white";
    html.onclick = game;
};

html.onclick = game;
