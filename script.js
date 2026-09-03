/* =========================================
   ALLISON WEBSITE
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const introScreen =
    document.getElementById("intro-screen");

const enterButton =
    document.getElementById("enter-button");

const cursor =
    document.getElementById("cursor-glow");


/* =========================================
   BLOQUEAR SCROLL AL INICIO
========================================= */

document.body.classList.add("no-scroll");


/* =========================================
   ENTRAR
========================================= */

enterButton.addEventListener("click", () => {

    introScreen.classList.add("hidden");

    document.body.classList.remove("no-scroll");

    /*
        La interacción del usuario ocurre aquí,
        por lo que podemos intentar iniciar
        la música sin que el navegador la bloquee.
    */

    setTimeout(() => {

        if (playerReady && player) {

            player.playVideo();

        }

    }, 800);

});


/* =========================================
   CURSOR
========================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        cursor.style.left =
            `${event.clientX}px`;

        cursor.style.top =
            `${event.clientY}px`;

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const sections =
    document.querySelectorAll(".section");


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


sections.forEach((section) => {

    observer.observe(section);

});


/* =========================================
   CORAZONES
========================================= */

function createHeart() {

    const heart =
        document.createElement("div");


    heart.textContent =
        Math.random() > .5
            ? "♡"
            : "♥";


    heart.style.position =
        "fixed";


    heart.style.left =
        `${Math.random() * 100}vw`;


    heart.style.bottom =
        "-30px";


    heart.style.fontSize =
        `${Math.random() * 15 + 10}px`;


    heart.style.color =
        "#ff4fa3";


    heart.style.pointerEvents =
        "none";


    heart.style.zIndex =
        "999";


    heart.style.opacity =
        `${Math.random() * .5 + .3}`;


    document.body.appendChild(heart);


    const duration =
        Math.random() * 4000 + 4000;


    heart.animate(

        [

            {
                transform:
                    "translateY(0) rotate(0deg)",

                opacity: 0

            },

            {
                opacity: .8
            },

            {

                transform:
                    `translateY(-110vh) rotate(${Math.random() * 360}deg)`,

                opacity: 0

            }

        ],

        {

            duration: duration,

            easing: "linear"

        }

    );


    setTimeout(() => {

        heart.remove();

    }, duration);

}


setInterval(
    createHeart,
    900
);


/* =========================================
   PLAYLIST DE YOUTUBE
========================================= */

const playlist = [
    {
        title: "Amor Completo",
        artist: "Mon Laferte",
        videoId: "PQlG1gznMBE"
    },
    {
        title: "Lo Bonita Que Estás",
        artist: "LUCAH",
        videoId: "68gTKbA45Ak"
    },
    {
        title: "Le Chat Noir - Bonus Track",
        artist: "Nasa Histoires",
        videoId: "j3sXqNfzzZc"
    },
    {
        title: "Iris",
        artist: "The Goo Goo Dolls",
        videoId: "NdYWuo9OFAw"
    },
    {
        title: "Sabor a Mí",
        artist: "Los Panchos",
        videoId: "Qg_L54DW69U"
    },
    {
        title: "Ojos Color Sol",
        artist: "Calle 13 ft. Silvio Rodríguez",
        videoId: "1Nr_tqkMsJs"
    },
    {
        title: "Nada Valgo Sin Tu Amor",
        artist: "Juanes",
        videoId: "0N0Cu-wutyU"
    }
];

/* =========================================
   VARIABLES DEL REPRODUCTOR
========================================= */

let player = null;

let playerReady = false;

let currentTrack = 0;

let isPlaying = false;


/* =========================================
   ELEMENTOS DEL REPRODUCTOR
========================================= */

const trackTitle =
    document.getElementById(
        "track-title"
    );


const trackArtist =
    document.getElementById(
        "track-artist"
    );


const playButton =
    document.getElementById(
        "music-play"
    );


const previousButton =
    document.getElementById(
        "music-prev"
    );


const nextButton =
    document.getElementById(
        "music-next"
    );


const vinyl =
    document.getElementById(
        "vinyl-disc"
    );


const progressBar =
    document.getElementById(
        "music-progress-bar"
    );


const currentTime =
    document.getElementById(
        "current-time"
    );


const totalTime =
    document.getElementById(
        "total-time"
    );


const playlistButtons =
    document.querySelectorAll(
        ".playlist-song"
    );


/* =========================================
   CARGAR API DE YOUTUBE
========================================= */

const youtubeScript =
    document.createElement(
        "script"
    );


youtubeScript.src =
    "https://www.youtube.com/iframe_api";


document.head.appendChild(
    youtubeScript
);


/* =========================================
   YOUTUBE API READY
========================================= */

window.onYouTubeIframeAPIReady =
    function () {

        player =
            new YT.Player(
                "youtube-player",
                {

                    width: "1",

                    height: "1",

                    videoId:
                        playlist[
                            currentTrack
                        ].videoId,

                    playerVars: {

                        autoplay: 0,

                        controls: 0,

                        playsinline: 1,

                        rel: 0,

                        enablejsapi: 1

                    },

                    events: {

                        onReady:
                            onPlayerReady,

                        onStateChange:
                            onPlayerStateChange

                    }

                }
            );

    };window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("youtube-player", {
        width: "1",
        height: "1",
        videoId: playlist[currentTrack].videoId,
        playerVars: {
            autoplay: 0,
            controls: 0,
            playsinline: 1,
            rel: 0,
            enablejsapi: 1
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError // Captura de errores
        }
    });
};

/* Manejo de errores de restricción o vídeos caídos */
function onPlayerError(event) {
    console.warn(`El vídeo ${playlist[currentTrack].videoId} no se puede reproducir (Código de error: ${event.data}). Pasando a la siguiente...`);
    // Pasa automáticamente al siguiente tema si hay un error de inserción
    nextTrack();
}

/* =========================================
   PLAYER READY
========================================= */

function onPlayerReady() {

    playerReady = true;

    updateTrackUI();

}


/* =========================================
   ESTADO DEL PLAYER
========================================= */

function onPlayerStateChange(event) {


    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {

        isPlaying = true;

        playButton.textContent =
            "❚❚";

        vinyl.classList.add(
            "playing"
        );

    }


    else if (
        event.data ===
        YT.PlayerState.PAUSED
    ) {

        isPlaying = false;

        playButton.textContent =
            "▶";

        vinyl.classList.remove(
            "playing"
        );

    }


    else if (
        event.data ===
        YT.PlayerState.ENDED
    ) {

        nextTrack();

    }

}


/* =========================================
   PLAY / PAUSE
========================================= */

playButton.addEventListener(
    "click",
    () => {

        if (!playerReady) return;


        if (isPlaying) {

            player.pauseVideo();

        }

        else {

            player.playVideo();

        }

    }
);


/* =========================================
   SIGUIENTE
========================================= */

function nextTrack() {

    currentTrack++;


    if (
        currentTrack >=
        playlist.length
    ) {

        currentTrack = 0;

    }


    loadTrack();

}


/* =========================================
   ANTERIOR
========================================= */

function previousTrack() {

    currentTrack--;


    if (currentTrack < 0) {

        currentTrack =
            playlist.length - 1;

    }


    loadTrack();

}


nextButton.addEventListener(
    "click",
    nextTrack
);


previousButton.addEventListener(
    "click",
    previousTrack
);


/* =========================================
   CARGAR CANCIÓN
========================================= */

function loadTrack() {

    if (!playerReady) return;


    const track =
        playlist[currentTrack];


    player.loadVideoById(
        track.videoId
    );


    updateTrackUI();

}


/* =========================================
   ACTUALIZAR INTERFAZ
========================================= */

function updateTrackUI() {

    const track =
        playlist[currentTrack];


    trackTitle.textContent =
        track.title;


    trackArtist.textContent =
        track.artist;


    playlistButtons.forEach(
        (button, index) => {

            button.classList.toggle(
                "active",
                index === currentTrack
            );

        }
    );


    progressBar.style.width =
        "0%";


    currentTime.textContent =
        "0:00";


    totalTime.textContent =
        "0:00";

}


/* =========================================
   PLAYLIST CLICK
========================================= */

playlistButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.index
                    );


                currentTrack = index;


                loadTrack();

            }
        );

    }
);


/* =========================================
   BARRA DE PROGRESO
========================================= */

setInterval(
    () => {

        if (
            !playerReady ||
            !isPlaying
        ) {

            return;

        }


        if (
            typeof player.getCurrentTime !==
            "function"
        ) {

            return;

        }


        const current =
            player.getCurrentTime();


        const duration =
            player.getDuration();


        if (!duration) return;


        const percentage =
            (
                current /
                duration
            ) * 100;


        progressBar.style.width =
            `${percentage}%`;


        currentTime.textContent =
            formatTime(current);


        totalTime.textContent =
            formatTime(duration);


    },

    500
);


/* =========================================
   CLICK EN LA BARRA
========================================= */

document
    .querySelector(".music-progress")
    .addEventListener(
        "click",
        (event) => {

            if (!playerReady) return;


            const rect =
                event.currentTarget
                    .getBoundingClientRect();


            const position =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width;


            const duration =
                player.getDuration();


            player.seekTo(
                duration * position,
                true
            );

        }
    );


/* =========================================
   FORMATO DE TIEMPO
========================================= */

function formatTime(seconds) {

    seconds =
        Math.floor(seconds);


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds % 60;


    return (
        `${minutes}:` +
        `${remaining
            .toString()
            .padStart(2, "0")}`
    );

}