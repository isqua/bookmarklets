Array.prototype.filter.call(
    document.querySelectorAll('.has-inline-notes:not(.open)'),
    function(inlineNote) { return !inlineNote.querySelector('.reaction-summary-item[value="HOORAY unreact"]') }
)
    .map(function(inlineNote) { return inlineNote.querySelector('.show-outdated-button') })
    .forEach(function(button) { button.click() })
