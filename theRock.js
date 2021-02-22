const searchSongs = async() => {
    const searchText = document.getElementById('searchSong').value;
    const apiUrl = `https://api.lyrics.ovh/suggest/${searchText}`  
    const res =  await fetch(apiUrl);
    const data = await res.json();
    displaySongs(data.data);
}

const displaySongs = songs => {

    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';

        songDiv.innerHTML = `
            <div class="col-md-6">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by: <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-6 text-md-right text-center">
                <button class="btn btn-success margin" onclick="getLyric('${song.artist.name}','${song.title}')">Get Lyrics</button>
                <audio class="audio-song" controls src="${song.preview}"></audio>
            </div>
        `;
        songContainer.appendChild(songDiv);
    })
}

const getLyric = async(artist, title) => {
    const lyricsApi = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const res = await fetch(lyricsApi);
    const data = await res.json();
    displayLyric(data.lyrics);
}

const displayLyric = lyrics => {
    const lyricDiv = document.getElementById('showLyric');
    lyricDiv.innerText = lyrics;
}

