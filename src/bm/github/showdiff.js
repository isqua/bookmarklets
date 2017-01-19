Array.prototype.forEach.call(
    document.querySelectorAll('.has-inline-notes:not(.open) .show-outdated-button'),
    function(b) { b.click() }
)
