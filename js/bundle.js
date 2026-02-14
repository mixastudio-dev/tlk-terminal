const header = document.querySelector('header');

if (header) {
  const toggleScrolledClass = () => {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolledClass);
  toggleScrolledClass();
}

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const currentPath = window.location.pathname;
      const linkPath = this.pathname;

      if (linkPath !== '' && linkPath !== currentPath) {
        const url = linkPath + targetId;
        window.location.href = url;
      } else {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        const windowHeight = window.innerHeight;
        const elementHeight = targetElement.offsetHeight;

        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (windowHeight / 2) + (elementHeight / 2);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        history.pushState(null, null, targetId);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        const offset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var modalButtons = document.querySelectorAll('.open-modal-dialog'),
      overlay = document.querySelector('body'),
      closeButtons = document.querySelectorAll('.modal-dialog .modal-close');

  var currentOpenModal = null;

  async function openModal(modalBtn) {
    return new Promise(resolve => {
      var modalId = modalBtn.getAttribute('data-src'),
          modalElem = document.querySelector('.modal-dialog.' + modalId);

      if (currentOpenModal && currentOpenModal !== modalElem) {
        closeModalDirectly(currentOpenModal);
      }

      overlay.classList.add('modal-open');
      modalElem.style.display = 'flex';

      setTimeout(function() {
        modalElem.classList.add('modal-opening');
        currentOpenModal = modalElem;
        resolve();
      }, 0);
    });
  }

  async function closeModal(closeBtn) {
    return new Promise(resolve => {
      var modal = closeBtn.closest('.modal-dialog');
      modal.classList.remove('modal-opening');
      modal.classList.add('modal-closing');

      setTimeout(function() {
        modal.classList.remove('modal-closing');
        modal.style.display = 'none';
        overlay.classList.remove('modal-open');
        if (currentOpenModal === modal) {
          currentOpenModal = null;
        }
        resolve();
      }, 500);
    });
  }

  function closeModalDirectly(modalElem) {
    modalElem.classList.remove('modal-opening');
    modalElem.style.display = 'none';

    if (currentOpenModal === modalElem) {
      currentOpenModal = null;
    }

    var anyModalOpen = document.querySelector('.modal-dialog[style*="display: flex"]');
    if (!anyModalOpen) {
      overlay.classList.remove('modal-open');
    }
  }

  /* open modal */
  modalButtons.forEach(function(modalBtn) {
    modalBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      await openModal(modalBtn);
    });
  });

  /* close modal */
  closeButtons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', async function(e) {
      await closeModal(closeBtn);
    });
  });

  document.querySelectorAll('.modal-dialog').forEach(function(modal) {
    modal.addEventListener('click', async function(e) {
      const modalBody = modal.querySelector('.modal-body');
      if (modalBody && !modalBody.contains(e.target)) {
        await closeModal(modal);
      }
    });
  });

});

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const closeMenuButton = document.querySelector('.close-menu-button');
  const headerNav = document.querySelector('.header-nav');

  function isMobileView() {
    return window.innerWidth <= 1024;
  }

  function toggleMenu() {
    if (isMobileView()) {
      headerNav.classList.toggle('show');
      mobileMenuButton.classList.toggle('active');
      document.body.style.overflow = headerNav.classList.contains('show') ? 'hidden' : '';
    }
  }

  function closeMenu() {
    headerNav.classList.remove('show');
    mobileMenuButton.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileMenuButton.addEventListener('click', toggleMenu);
  closeMenuButton.addEventListener('click', closeMenu);

  const menuLinks = document.querySelectorAll('.main-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (isMobileView()) {
        closeMenu();
      }
    });
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });
});

function checkVisibility() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Проверяем, находится ли блок в футере
    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

    const isVisible = rect.top <= windowHeight - offset && rect.bottom >= 0;

    if (isVisible) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

function checkAllBlocks() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

    if (rect.top <= windowHeight - offset && rect.bottom >= 0) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

window.addEventListener('load', function() {
  checkVisibility();
  setTimeout(checkAllBlocks, 500);
});

window.addEventListener('scroll', checkVisibility);

window.addEventListener('resize', function() {
  setTimeout(checkAllBlocks, 100);
});

document.addEventListener('DOMContentLoaded', function() {
  const statItems = document.querySelectorAll('.block-stats-js .stat-item .item-title');

  function animateNumber(element, target, suffix, duration) {
    let start = null;
    let startValue = 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * target);

      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent.trim();
        const match = text.match(/^([\d.]+)(.*)$/);

        if (match && !element.hasAttribute('data-animated')) {
          const target = parseFloat(match[1]);
          const suffix = match[2];
          const duration = parseInt(element.dataset.duration) || 2000;

          animateNumber(element, target, suffix, duration);
          element.setAttribute('data-animated', 'true');
          observer.unobserve(element);
        }
      }
    });
  }, { threshold: 0.5 });

  statItems.forEach(item => observer.observe(item));
});

document.addEventListener('DOMContentLoaded', function() {
  const decoratedHeaders = document.querySelectorAll('.decorated-h2');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const header = entry.target;

        header.classList.add('bounce');

        setTimeout(() => {
          header.classList.remove('bounce');
        }, 500);

      }
    });
  }, { threshold: 1 });

  decoratedHeaders.forEach(header => observer.observe(header));
});



document.addEventListener('DOMContentLoaded', function() {
  const lines = document.querySelectorAll('.animated-title strong');
  const texts = Array.from(lines).map(el => el.textContent.trim());

  lines.forEach((line, index) => {
    const text = texts[index];
    line.innerHTML = '';

    const container = document.createElement('span');
    container.className = 'typing-line';

    text.split('').forEach(char => {
      if (char === ' ') {
        container.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;
        container.appendChild(span);
      }
    });

    line.appendChild(container);
  });

  async function startTyping() {
    for (let i = 0; i < lines.length; i++) {
      await typeLine(lines[i], i === lines.length - 1);
    }
  }

  async function typeLine(lineElement, isLastLine = false) {
    const container = lineElement.querySelector('.typing-line');
    const chars = container.querySelectorAll('.char');

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    container.appendChild(cursor);

    container.insertBefore(cursor, container.firstChild);

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      await new Promise(resolve => setTimeout(resolve, 30));

      char.classList.add('visible');

      if (char.nextSibling) {
        char.parentNode.insertBefore(cursor, char.nextSibling);
      } else {
        container.appendChild(cursor);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 200));

    if (isLastLine) {
      cursor.style.opacity = '0';
      cursor.style.animation = 'none';
      cursor.style.width = '3px';
      cursor.style.display = 'inline-block';
      cursor.classList.add('cursor-hidden');
    } else {
      cursor.remove();
    }
  }

  startTyping();
});
