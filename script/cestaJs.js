 fetch("index.html")
    .then(response => response.text())
    .then(data => {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = data;

        let headerContent = tempDiv.querySelector("header");
        console.log(headerContent)
        if (headerContent) {
            document.getElementById("headerCesta").innerHTML = headerContent.innerHTML;
    }
});