function searchVideos() {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const query = document.getElementById("searchInput").value.trim();

    if (query === "") {
        alert("Please enter a search term.");
        return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("videoResults");
            container.innerHTML = "";

            if (!data.items) {
                alert("YouTube API error. Check API key or restrictions.");
                console.error(data);
                return;
            }

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const thumbnail = item.snippet.thumbnails.medium.url;

                const div = document.createElement("div");
                div.style.padding = "10px";
                div.style.border = "1px solid #ccc";
                div.style.borderRadius = "0px";
                div.style.textAlign = "center";
                div.style.background = "#000000ff";
                div.style.fontFamily = "Montserrat";
                div.style.fontWeight = "100";
                div.style.color = "white";

                div.innerHTML = `
                    <img src="${thumbnail}" style="width:100%; border-radius:8px;">
                    <h3 style="font-size:16px;">${title}</h3>
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                        <button style="padding:5px 10px; margin-top:10px;">Watch</button>
                    </a>
                `;

                container.appendChild(div);
            });
        })
        .catch(err => {
            console.error("YouTube API Error:", err);
            alert("Failed to load YouTube results.");
        });
}
