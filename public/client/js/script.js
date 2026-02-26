const aplayer = document.getElementById("aplayer");
if(aplayer){
    const song = JSON.parse(aplayer.getAttribute("data-song"));
    const singer = JSON.parse(aplayer.getAttribute("data-singer"))
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        lrcType:1,
        audio: [{
            name: song.title,
            artist: singer.fullName,
            url: song.audio,
            cover: song.thumbnail,
            lrc: song.lyrics
        }]
    });
    ap.on("play", () => {
        document.querySelector(".inner-thumbnail")?.classList.add("playing");
    });

    ap.on("pause", () => {
        document.querySelector(".inner-thumbnail")?.classList.remove("playing");
    });

    ap.on("ended", () => {
        const link = `/songs/listen/${song._id}`;
        fetch(link,{method: "PATCH"})
            .then(res => res.json())
            .then(data => {
                const spanView = document.querySelector(".inner-view span");
                if(spanView){
                    spanView.innerHTML = data.listen
                }
            })
    })
}
const listButtonLike = document.querySelectorAll(".inner-like");
if(listButtonLike.length > 0){
    listButtonLike.forEach((buttonLike) => {
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
    })
}
const listButtonFavorite = document.querySelectorAll(".inner-heart");
if(listButtonFavorite.length > 0){
    listButtonFavorite.forEach((buttonFavorite) => {
        buttonFavorite.addEventListener("click", () => {
            const idSong = buttonFavorite.getAttribute("data-id");

            const isActive = buttonFavorite.classList.contains("active");
            
            const link = `/songs/heart/${isActive ? "un-heart" : "heart"}/${idSong}`;
            fetch(link,{method: "PATCH"})
                .then(res => res.json())
                .then(data => {
                    buttonFavorite.classList.toggle("active");
                });
        })
    })

}
const boxSearch = document.querySelector(".box-search");
if(boxSearch){
    const inputSearch = boxSearch.querySelector("input[name='keyword']");
    inputSearch.addEventListener("keydown",() => {
        const keyword = inputSearch.value;
        
        const link = `/search/suggest/?keyword=${keyword}`;
        fetch(link)
            .then(res => res.json())
            .then(data => {
                const boxSuggest = boxSearch.querySelector(".inner-suggest");
                const songs = data.songs;
                if(songs.length > 0){
                    boxSuggest.innerHTML = "";
                    for(const song of songs){
                        const a = document.createElement("a");
                        a.classList.add("inner-item");
                        a.setAttribute("href",`/songs/detail/${song.slug}`);
                        const htmls = `
                            <div class="inner-image">
                                <img src="${song.thumbnail}"/>
                            </div>
                            <div class="inner-info">
                                <div class="inner-title">
                                    ${song.title}
                                </div>
                                <div class="inner-singer">
                                    <i class="fa-solid fa-microphone-lines"></i>
                                    <span>${song.infoSinger}</span>
                                </div>
                            </div>
                        `;
                        a.innerHTML = htmls;
                        boxSuggest.appendChild(a);
                        boxSuggest.classList.add("show");
                    }
                }else{
                    boxSuggest.classList.remove("show");
                }
            })

    })
}