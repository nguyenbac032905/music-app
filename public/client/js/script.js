const aplayer = document.getElementById("aplayer");
if(aplayer){
    const song = JSON.parse(aplayer.getAttribute("data-song"));
    const singer = JSON.parse(aplayer.getAttribute("data-singer"))
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        audio: [{
            name: song.title,
            artist: singer.fullName,
            url: song.audio,
            cover: song.thumbnail
        }]
    });
    ap.on("play", () => {
        document.querySelector(".inner-thumbnail")?.classList.add("playing");
    });

    ap.on("pause", () => {
        document.querySelector(".inner-thumbnail")?.classList.remove("playing");
    });
}
