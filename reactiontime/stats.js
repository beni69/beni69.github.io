// global stats
function LoadGlobal() {
    fetch("http://api.karesz.xyz/karesz/reaction", {method: "GET"})
        .then(response => response.json())
        .then(data => {
            document.getElementById("avgG").innerHTML =
                Math.round(data.average) + "ms";
            document.getElementById("minG").innerHTML = data.min + "ms";
        })
        .catch(err => console.error(err));
}

// local stats
function LoadLocal() {
    const average = localStorage.getItem("average");
    document.getElementById("avgL").innerHTML =
        average == null ? "No data" : Math.round(average);
    const min = localStorage.getItem("min");
    document.getElementById("minL").innerHTML =
        min == null ? "No data" : Math.round(min);
}

function ResetLocal() {
    localStorage.clear();
    alert("Done!");
    location.reload();
}
