navigator.clipboard
    .writeText(`${window.document.title} ${window.location.href}`)
    .catch(e => console.error(e))
