fetch("http://api.karesz.xyz/karesz/reaction", {method: "GET"})
    .then(response => response.json())
    .then(data => {
        document.getElementById("average").innerHTML = Math.round(data.average);
        document.getElementById("min").innerHTML = data.min;
    })
    .catch(err => console.error(err));
