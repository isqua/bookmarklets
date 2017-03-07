Array.prototype.filter.call(
    document.querySelectorAll('.outdated-comment.has-inline-notes:not(.open)'),
    function(inlineNote) { return !inlineNote.querySelector('.reaction-summary-item[value^="HOORAY"]') }
)
    .map(function(inlineNote) { return inlineNote.querySelector('.show-outdated-button') })
    .filter(Boolean)
    .forEach(function(button) { button.click() })
