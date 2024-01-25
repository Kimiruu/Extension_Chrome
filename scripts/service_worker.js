const userId = 434779285;
const token = "6ge7hbft6bxzf01axxkqcnp1cc9ot4";
const clientID = "lin46c5nyjf1l1zldpp9114tuzlpi4";

const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
const twitchUrl = "https://www.twitch.tv/st4rflyy";
const headers = {
    Authorization: `Bearer ${token}`,
    "client-id": clientID,
};

let isLiveOn = false;

const cb = function (json) {
    if (json?.data?.length && !isLiveOn) {
        setIcon("../image/icon_16_16.png");
        chrome.notifications.create("LiveOn", {
            title: "St4rflyy est en live",
            iconUrl: "../image/icon_128_128.png",
            message: "Rejoins le live dès maintenant !",
            imageUrl: "../image/starting_soon.png",
            type: "image",
        });
        isLiveOn = true;
    } else {
        setIcon("../image/icon_16_16_offline.png");
        isLiveOn = false;
    }
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

function setIcon(path) {
    chrome.action.setIcon({ path: path });
}

fetchTwitterAPI(url, headers, cb);

chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({
        url: twitchUrl,
    });
});

chrome.alarms.create({ periodInMinutes: 30 });

chrome.alarms.onAlarm.addListener(() => {
    fetchTwitterAPI(url, headers, cb);
});
