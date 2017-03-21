(function() {
    var clanFilter = prompt('Enter Clan:');
    clanFilter = clanFilter.toLowerCase();

    Array.prototype.forEach.call(
        document.querySelectorAll('tr[data-username]'),
        function (tr) {
            var currentClan = tr.querySelector('td:nth-child(3)').textContent.toLowerCase();

            tr.style.display = currentClan.indexOf(clanFilter) === -1 ? 'none' : null;
        }
    );
})();
