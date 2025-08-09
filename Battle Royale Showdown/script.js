// Slideshow functionality
document.addEventListener('DOMContentLoaded', function () {
  // Rating stars functionality
  function setupStars(containerId, scoreId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scoreEl = document.getElementById(scoreId);
    let score = parseFloat(scoreEl.textContent) || 3.5;

    container.querySelectorAll('.star').forEach(s => {
      const val = Number(s.dataset.value);
      s.textContent = (val <= Math.round(score)) ? '★' : '☆';
      s.addEventListener('click', () => {
        score = val;
        scoreEl.textContent = score.toFixed(1);
        container.querySelectorAll('.star').forEach(x => {
          x.textContent = (Number(x.dataset.value) <= val) ? '★' : '☆';
        });
      });
    });
  }

  setupStars('codm-stars', 'codm-score');
  setupStars('pubg-stars', 'pubg-score');

  // Voting functionality
  const vcEl = document.getElementById('vc');
  const vpEl = document.getElementById('vp');

  if (vcEl && vpEl) {
    let vc = Number(vcEl.textContent);
    let vp = Number(vpEl.textContent);

    const voteCodm = document.getElementById('vote-codm');
    const votePubg = document.getElementById('vote-pubg');

    if (voteCodm) {
      voteCodm.addEventListener('click', (e) => {
        e.preventDefault();
        vc++;
        vcEl.textContent = vc;
      });
    }

    if (votePubg) {
      votePubg.addEventListener('click', (e) => {
        e.preventDefault();
        vp++;
        vpEl.textContent = vp;
      });
    }
  }

  // Comments functionality
  const form = document.getElementById('comment-form');
  const commentList = document.getElementById('comments');

  if (form && commentList) {
    function renderComments() {
      const comments = JSON.parse(localStorage.getItem('brs-comments') || '[]');
      commentList.innerHTML = '';
      comments.slice().reverse().forEach(c => {
        const el = document.createElement('div');
        el.className = 'comment-item';
        el.innerHTML = `<strong>${c.name || 'Anonymous'}</strong><div>${c.text}</div>`;
        commentList.appendChild(el);
      });
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const text = document.getElementById('text').value.trim();
      if (!text) return alert('Write something first!');

      const comments = JSON.parse(localStorage.getItem('brs-comments') || '[]');
      comments.push({ name, text, time: Date.now() });
      localStorage.setItem('brs-comments', JSON.stringify(comments));

      form.reset();
      renderComments();
    });

    renderComments();
  }

  const slideshow = document.getElementById('slideshow');
    const images = slideshow.querySelectorAll('img');
    let currentIndex = 0;

    // Set first image as active
    if (images.length > 0) {
      images[0].classList.add('active');
    }

    // Auto-rotate images every 3 seconds
    setInterval(() => {
      if (images.length > 0) {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
      }
    }, 3000);

    const slideshow1 = document.getElementById('slideshow1');
    const images1 = slideshow1.querySelectorAll('img');
    let currentIndex1 = 0;

    // Set first image as active
    if (images1.length > 0) {
      images1[0].classList.add('active');
    }

    // Auto-rotate images every 3 seconds
    setInterval(() => {
      if (images1.length > 0) {
        images1[currentIndex1].classList.remove('active');
        currentIndex1 = (currentIndex1 + 1) % images1.length;
        images1[currentIndex1].classList.add('active');
      }
    }, 3000);
});