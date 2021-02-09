fetch("http://api.karesz.xyz/karesz/reaction", {method: "GET"})
    .then(response => response.json())
    .then(data => {
        document.getElementById("average").innerHTML =
            Math.round(data.average) + "ms";
        document.getElementById("min").innerHTML = data.min + "ms";
    })
    .catch(err => console.error(err));
