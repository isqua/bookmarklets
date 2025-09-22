(async function() {
    const textToCopy = `${window.document.title} ${window.location.href}`;
    const htmlToCopy = `<a href="${window.location.href}">${window.document.title}</a>`;

    await navigator.clipboard.write([
        new ClipboardItem({
            'text/plain': new Blob([textToCopy], { type: 'text/plain' }),
            'text/html': new Blob([htmlToCopy], { type: 'text/html' })
        })
    ]);
})();
