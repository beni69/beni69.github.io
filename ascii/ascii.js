function submit() {
    const title = document.getElementById("title");
    const input = document.getElementById("input");
    const output = document.getElementById("output");

    const text = input.value;
    if (text == "") return;

    figlet.text(
        text,
        {
            horizontalLayout: "default",
            verticalLayout: "fitted",
            width: 140,
            whitespaceBreak: true,
        },
        (err, data) => {
            if (err) {
                alert(
                    "Error while creating ascii. See console for more details."
                );
                console.dir(err);
                return;
            }

            output.value = data;
        }
    );
}
