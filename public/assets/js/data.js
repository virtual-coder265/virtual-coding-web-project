fetch('https://virtual-coding.web.app')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const cards = Array.from(doc.querySelectorAll('.card')).map(card => ({
      title: card.querySelector('.card-title').textContent,
      text: card.querySelector('.card-text').textContent
    }));
    console.log(JSON.stringify(cards));
  });