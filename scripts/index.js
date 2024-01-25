import tokens from "./tokens.js";
const userId = tokens.userId;
const token = tokens.token;
const clientID = tokens.clientID;

const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
const twitchUrl = "https://www.twitch.tv/st4rflyy";
const twitterUrl = "https://twitter.com/St4rflyy_mov";
const tiktokUrl = "https://www.tiktok.com/@st4rflyy.mov?_t=8fneLaw6bDt&_r=1";
const headers = {
    Authorization: `Bearer ${token}`,
    "client-id": clientID,
};

const info = document.getElementById("info");
const image = document.getElementById("image");
const icon = document.getElementById("icon");
const twitch = document.getElementById("Left");
const twitter = document.getElementById("twitter");
const tiktok = document.getElementById("Right");

console.log(icon);

image.onclick = () => {
    chrome.tabs.create({
        url: twitchUrl,
    });
};

twitch.onclick = () => {
    chrome.tabs.create({
        url: twitchUrl,
    });
};

twitter.onclick = () => {
    chrome.tabs.create({
        url: twitterUrl,
    });
};

tiktok.onclick = () => {
    chrome.tabs.create({
        url: tiktokUrl,
    });
};

const cb = function (json) {
    info.innerHTML = json?.data?.length
        ? `St4rflyy est en Live !`
        : "St4rflyy est hors ligne";
    image.innerHTML = json?.data?.length
        ? (image.src = "../image/starting_soon.png")
        : (image.src = "../image/currently_offline.png");
    icon.innerHTML = json?.data?.length ? (icon.className = "actif") : "";
};

function fetchTwitterAPI(url, headers) {
    fetch(url, {
        headers: headers,
    })
        .then((reponse) => {
            return reponse.json();
        })
        .then((json) => cb(json));
}

fetchTwitterAPI(url, headers, cb);
