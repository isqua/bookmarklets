Array.from(document.querySelectorAll('button[type="submit"'))
    .filter(b => b.textContent.includes('hidden conversation'))
    .forEach(b => b.click())
