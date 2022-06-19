(function(){
    const allMedia = document.querySelectorAll('video, audio');
    
    let currentMedia = Array.prototype.find.call(allMedia, (media) => !media.paused);

    if (!currentMedia && allMedia.length > 0) {
        currentMedia = allMedia[0];
    }

    if (currentMedia) {
        currentMedia.playbackRate -= 0.1;
    }
})();
