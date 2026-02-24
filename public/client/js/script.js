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
const buttonLike = document.querySelector(".inner-like");
if(buttonLike){
    buttonLike.addEventListener("click",() => {
        const idSong = buttonLike.getAttribute("data-id");
        const isActive = buttonLike.classList.contains("active");

        const link = `/songs/like/${isActive? "dislike" : "like"}/${idSong}`;

        const spanLike = buttonLike.querySelector("span");
        const option ={
            method: "PATCH"
        }
        fetch(link,option)
            .then(res => res.json())
            .then(data => {
                spanLike.innerHTML = data.like;
                buttonLike.classList.toggle("active");
            })
    })
}
const buttonFavorite = document.querySelector(".inner-heart");
if(buttonFavorite){
    buttonFavorite.addEventListener("click", () => {
        const idSong = buttonFavorite.getAttribute("data-id");

        const isActive = buttonFavorite.classList.contains("active");
        
        const link = `/songs/heart/${isActive ? "un-heart" : "heart"}/${idSong}`;
        fetch(link,{method: "PATCH"})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                buttonFavorite.classList.toggle("active");
            });
    })

}