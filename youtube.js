function searchVideos() {
    const apiKey = "AIzaSyCsiQTSyrKbRLliLrtF3iIVvXlNAd7R100";
    const query = document.getElementById("searchInput").value.trim();

    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("videoResults");
            container.innerHTML = "";

            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const thumbnail = item.snippet.thumbnails.medium.url;

                container.innerHTML += `
                    <div style="padding:10px; background:#000; color:#fff;">
                        <img src="${thumbnail}" style="width:100%">
                        <h3>${title}</h3>
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <button>Watch</button>
                        </a>
                    </div>
                `;
            });
        })
        .catch(err => {
            console.error(err);
            alert("YouTube API failed");
        });
}
