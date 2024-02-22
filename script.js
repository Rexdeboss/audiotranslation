document.getElementById("translateBtn").addEventListener("click", function() {
    var audioFile = document.getElementById("audioInput").files[0];
    var languageCode = document.getElementById("languageSelect").value;

    if (!audioFile) {
        alert("Please select an audio file.");
        return;
    }

    var formData = new FormData();
    formData.append("audioFile", audioFile);
    formData.append("languageCode", languageCode);

    fetch("/translate", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("translatedText").innerText = data.translatedText;
        document.getElementById("translationResult").style.display = "block";
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred during translation.");
    });
});

document.getElementById("copyTextBtn").addEventListener("click", function() {
    var translatedText = document.getElementById("translatedText").innerText;
    navigator.clipboard.writeText(translatedText)
    .then(() => alert("Text copied to clipboard: " + translatedText))
    .catch(err => console.error("Error copying text: ", err));
});
