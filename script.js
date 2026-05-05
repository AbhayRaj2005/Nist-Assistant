// Background Image Slider
const bgImages = [
    "WhatsApp Image 2026-05-04 at 1.02.19 AM.jpeg",
    "WhatsApp Image 2026-05-04 at 1.15.35 AM.jpeg",
    "WhatsApp Image 2026-05-04 at 1.02.20 AM (1).jpeg"
];

let currentBg = 0;

function updateBackground() {
    document.body.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('${bgImages[currentBg]}')`;

    currentBg = (currentBg + 1) % bgImages.length;
}

updateBackground();
setInterval(updateBackground, 7000);

// YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
        videoId: '1tJNvbasrZU',
        playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: '1tJNvbasrZU',
            controls: 0,
            rel: 0,
            modestbranding: 1
        }
    });

    new YT.Player('sports-player', {
        videoId: 'LtWWcfw_fkg',
        playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: 'LtWWcfw_fkg',
            controls: 0,
            rel: 0,
            modestbranding: 1
        }
    });
}