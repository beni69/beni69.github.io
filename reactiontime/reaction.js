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

            html.onclick = idle;
        };
    }, wait);
    return;
};

const idle = () => {
    const body = document.getElementsByTagName("body")[0];
    const h1 = document.getElementById("h1");
    h1.innerHTML = "Click anywhere to start";
    body.style.backgroundColor = "white";
    html.onclick = game;
};

html.onclick = game;
