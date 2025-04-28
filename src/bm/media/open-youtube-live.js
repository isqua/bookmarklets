(function () {
    const iframes = document.querySelectorAll('iframe');

    let youtube = Array.prototype.find.call(
        iframes,
        (frame) => frame.src && frame.src.includes('//www.youtube.com'),
    );

    if (!youtube) {
        alert('Youtube iframe not found');
    }

    const paths = new URL(youtube.src).pathname.split('/');
    const embedIndex = paths.findIndex(p => p === 'embed');

    if (embedIndex === -1) {
        alert('Cannot parse youtube url');
    }

    const videoId = paths[embedIndex + 1];
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    window.open(videoUrl);

    navigator.clipboard
        .writeText(videoUrl)
        .catch(e => console.error(e))
})();
