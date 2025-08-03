// Song data
let songs = [
    {
        title: "5 am",
        artist: "James Renaldo",
        src: "5 am.mpeg",
        img: "5 ams.jpeg"
    },
    {
        title: "Callin U",
        artist: "Mike Leo",
        src: "Callin U.mpeg",
        img: "Caalin u.jpeg"
    },
    {
        title: "Chand Sifarish",
        artist: "DJ Nova",
        src: "Chand Sifarish.mp",
        img: "Chand sifarishh.jpeg"
    },
    {
        title: "Shaky Shaky",
        artist: "Michale",
        src: "Shaky Shaky.mpeg",
        img: "Shaky shakyy.jpeg"
    },
    {
        title: "Meri Jan",
        artist: "MJ Lorense",
        src: "Meri Jan.mpeg",
        img: "Meri jaan.jpeg"
    }
];

let currentSong = 0;
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let progress = document.getElementById("progress");
let favIcon = document.getElementById("favIcon");
let isFavorite = false;

// Welcome screen to player page
function enterApp() {
   document.getElementById("welcomeScreen").style.display = "none";
   document.getElementById("playerPage").classList.add("active");
}

// Player page back to welcome
function mainPage() {
    document.getElementById("welcomeScreen").style.display = "block";
    document.getElementById("playerPage").classList.remove("active");
}

// Show song list
function showSongList() {
    document.getElementById("playerPage").style.display = "none";
    document.getElementById("songListPage").style.display = "block";
}

// Back to player from song list
function backToPlayer() {
    document.getElementById("playerPage").style.display = "block";
    document.getElementById("songListPage").style.display = "none";
}

// Load song
function loadSong(index) {
    currentSong = index;
    song.src = songs[index].src;
    document.getElementById("title").textContent = songs[index].title;
    document.getElementById("artist").textContent = songs[index].artist;
    document.getElementById("song-img").src = songs[index].img;
    song.load();
    playPause(true);
    backToPlayer();
}

// Play / Pause
function playPause(forcePlay = false) {
    if (forcePlay || song.paused) {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

// Next song
function playNext() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
}

// Previous song
function playPrev() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
}

// Update progress bar
song.ontimeupdate = function () {
    progress.value = song.currentTime / song.duration * 100;
};

progress.oninput = function () {
    song.currentTime = (progress.value / 100) * song.duration;
};

// Volume control
document.getElementById("volumeSlider").oninput = function () {
    song.volume = this.value;
};

// Toggle favorite
function toggleFavorite() {
    isFavorite = !isFavorite;
    if (isFavorite) {
        favIcon.classList.remove("fa-regular");
        favIcon.classList.add("fa-solid");
        favIcon.style.color = "red";
    } else {
        favIcon.classList.remove("fa-solid");
        favIcon.classList.add("fa-regular");
        favIcon.style.color = "";
    }
}

// Add new song (dummy placeholder)
function addSong() {
    let title = prompt("Enter song title:");
    let artist = prompt("Enter artist name:");
    let src = prompt("Enter song file name (must be in same folder):");
    let img = prompt("Enter image file name (must be in same folder):");

    if (title && artist && src && img) {
        songs.push({ title, artist, src, img });
        updateSongList();
        alert("Song added successfully!");
    } else {
        alert("All fields are required.");
    }
}

// Remove current song
function removeCurrentSong() {
    if (songs.length === 1) {
        alert("Cannot remove the last song.");
        return;
    }
    songs.splice(currentSong, 1);
    currentSong = 0;
    updateSongList();
    loadSong(currentSong);
    alert("Current song removed!");
}

// Update song list UI
function updateSongList() {
    let list = document.getElementById("list");
    list.innerHTML = "";
    songs.forEach((songObj, index) => {
        let li = document.createElement("li");
        li.textContent = `${songObj.title} - ${songObj.artist}`;
        li.onclick = () => loadSong(index);
        list.appendChild(li);
    });
}

// Initial load
window.onload = () => {
    loadSong(0);
    updateSongList();
};
