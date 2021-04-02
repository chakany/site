// From synn-loadscreen (https://github.com/vecchiotom/synn-loadscreen/blob/master/js/music-handler.js)

var np = document.getElementById("now-playing");

var lib ={
    rand: function(min, max)
        {
            return min + Math.floor(Math.random()*max);
        }
}

var music ={
    list:
    [
        "rpaonSDPw7Y", "x8Ru8d0l_fU", "PRRMPtkmJjA", "weWTuvdL-LQ",
        "KU7r89OoAho", "BTPRlerb1zQ", "herNYSdJd0o", "A7_0vcjN-4c",
        "NYpXwlGT7XE", "lbvX5xQGN_8"
    ]
}

var playing = true;

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '32') {
        // space bar
        if (playing) {
                pause();
                playing = false;
        } else {
                resume();
                playing = true;
        }
    }
}

if('true')
{
    setInterval(UpdateMusicInfo, 1000);
}
else
{
    container.style.display = "none";
}

function UpdateMusicInfo()
{

    if(title.length != 0)
    {
        np.innerHTML = `Now Playing: <a id="song-title" href="https://youtube.com/watch?v=${musicIndex}">${title}</a>`;
    }
    else
    {
        np.innerHTML = "Now Playing: n.a.";
    }
}

//YouTube IFrame API player.
var player;

if('true')
{
    //Create DOM elements for the player.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    var ytScript = document.getElementsByTagName('script')[0];
    ytScript.parentNode.insertBefore(tag, ytScript);

    //Pick random index to start at.
    var musicIndex = lib.rand(0, music.list.length);
    var title = "n.a.";
}

function onYouTubeIframeAPIReady() 
{
    var videoId = music.list[musicIndex];

    player = new YT.Player('player', {
        width: '600',
        height: '600',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'disablekb': 0,
            'enablejsapi': 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError 
        }
    });
}

function onPlayerReady(event) 
{
    title = event.target.getVideoData().title;
    player.setVolume('15');

    play();
}

function onPlayerStateChange(event) 
{
    if(event.data == YT.PlayerState.PLAYING)
    {
        title = event.target.getVideoData().title;
    }

    if (event.data == YT.PlayerState.ENDED) 
    {
        musicIndex++;
        play();
    }
}

function onPlayerError(event)
{
    switch (event.data) 
    {
        case 2:
            console.log("Invalid video url!");
            break;
        case 5:
            console.log("HTML 5 player error!");
        case 100:
            console.log("Video not found!");
        case 101:
        case 150:
            console.log("Video embedding not allowed.");
            break;
        default:
            console.log("Looks like you got an error bud.")
    }

    skip();
}

function skip()
{
    musicIndex++;
    play();
}
function back()
{
    musicIndex--;
    play();
}

function play()
{
    title = "n.a.";

    var idx = musicIndex % music.list.length;
    var videoId = music.list[idx];

    console.log("Playing next.. id: " + idx + " vid:" + videoId);

    player.loadVideoById(videoId, 0, "tiny");
    player.playVideo();
}

function resume()
{
    player.playVideo();
}

function pause() 
{
    player.pauseVideo();
}

function stop() 
{
    player.stopVideo();
}

function setVolume(volume)
{
    player.setVolume(volume)
}
