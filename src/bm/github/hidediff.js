Array.prototype.forEach.call(
    document.querySelectorAll('.has-inline-notes.open .show-outdated-button'),
    function(b) { b.click() }
)
