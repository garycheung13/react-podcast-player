export default {
    playQueue: [],
    playlist: [],
    search: {
        "resultCount": -1,
        "results": []
    },
    channel: {
        channel: {
            title: "loading...",
            description: "loading...",
            "itunes:summary": "loading",
            "itunes:image": {href: "http://via.placeholder.com/150x150"}
        }
    },
    curentPlayingPodcast: null,
    ajaxCallsInProgress: 0
};

//seach set to -1 so that the app can check if a search was actually made