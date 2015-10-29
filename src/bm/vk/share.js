(function(){
    var win = window.open(
        'https://vk.com/share.php?url=' + encodeURIComponent(window.location.href),
        'vksharebookmarklet',
        [
            'left=' + (screen.width/2 - 275),
            'top=' + (screen.height/2 - 165),
            'width=550',
            'height=330',
            'menubar=0',
            'toolbar=0',
            'location=0',
            'directories=0',
            'resizable=1',
            'scrollbars=1',
            'personalbar=0'
        ].join(',')
    );

    if (win) {
        win.focus();
    }
})();
