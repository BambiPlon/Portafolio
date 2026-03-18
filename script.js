/* ============================================
   Portfolio - Vanilla JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Cursor Glow Effect ----
  const cursorGlow = document.getElementById('cursorGlow');
  
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function (e) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function () {
      cursorGlow.style.opacity = '0';
    });
  }

  // ---- Navigation Scroll Effect ----
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ---- Mobile Navigation Toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  var mobileLinks = navLinks.querySelectorAll('.nav-link');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---- Active Navigation Link ----
  var sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    var scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        var allLinks = document.querySelectorAll('.nav-link');
        allLinks.forEach(function (link) {
          link.classList.remove('active');
        });
        var activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
        if (activeLink) {
          activeLink.style.color = 'var(--accent)';
        }
      } else {
        var inactiveLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
        if (inactiveLink) {
          inactiveLink.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // ---- Project Filtering ----
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active button
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      // Animate out
      projectCards.forEach(function (card) {
        card.classList.add('fade-out');
      });

      // After animation, show/hide
      setTimeout(function () {
        projectCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.classList.remove('fade-out');
          } else {
            card.classList.add('hidden');
            card.classList.remove('fade-out');
          }
        });
      }, 300);
    });
  });

  // ---- Scroll Reveal Animation ----
  var revealElements = document.querySelectorAll(
    '.project-card, .skill-card, .about-content, .contact-section'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  function checkReveal() {
    var windowHeight = window.innerHeight;
    var triggerPoint = windowHeight * 0.85;

    revealElements.forEach(function (el) {
      var elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerPoint) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Check on load

  // ---- Skill Bars Animation ----
  var skillBars = document.querySelectorAll('.skill-progress');
  var skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;

    var skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    var sectionTop = skillsSection.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.8) {
      skillsAnimated = true;
      skillBars.forEach(function (bar, index) {
        var progress = bar.getAttribute('data-progress');
        setTimeout(function () {
          bar.style.width = progress + '%';
        }, index * 150);
      });
    }
  }

  window.addEventListener('scroll', animateSkillBars);
  animateSkillBars(); // Check on load

  // ---- Smooth scroll for anchor links ----
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = link.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        var offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

// ---- Typing effect for greeting ----
  var greeting = document.querySelector('.hero-greeting');
  if (greeting) {
    var text = greeting.textContent;
    greeting.textContent = '';
    greeting.style.opacity = '1';
    greeting.style.transform = 'none';

    var i = 0;
    function typeWriter() {
      if (i < text.length) {
        greeting.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 60);
      }
    }

    setTimeout(typeWriter, 500);
  }

  // ---- Project Modal with Gallery ----
  var projectsData = {
    '1': {
      label: 'Proyecto Destacado',
      title: 'Sistema de Gestion de Inventario y Requisiciones de Compras',
      description: 'Sistema web de gestion de inventario y requisiciones, con control de solicitudes, estados (pendiente, aprobado), filtrado por fecha y estatus, y visualizacion en tarjetas dinamicas. Incluye autenticacion de usuarios y panel administrativo intuitivo. Diseno moderno y completamente responsivo, optimizado para una gestion eficiente de compras y seguimiento interno.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
      images: [
        'public/images/Inventario.png',
        'public/images/Cotiza.png',
        'public/images/Req.png',
        'public/images/Plantilla.png'
      ]
    }
  };

  var modal = document.getElementById('projectModal');
  var modalClose = document.getElementById('modalClose');
  var modalOverlay = modal.querySelector('.modal-overlay');
  var galleryImage = document.getElementById('galleryImage');
  var galleryThumbnails = document.getElementById('galleryThumbnails');
  var galleryCounter = document.getElementById('galleryCounter');
  var galleryPrev = document.getElementById('galleryPrev');
  var galleryNext = document.getElementById('galleryNext');
  var modalLabel = document.getElementById('modalLabel');
  var modalTitle = document.getElementById('modalTitle');
  var modalDescription = document.getElementById('modalDescription');
  var modalTech = document.getElementById('modalTech');

  var currentProject = null;
  var currentImageIndex = 0;

  // Open modal on project card click
  var projectCardsModal = document.querySelectorAll('.project-card');
  projectCardsModal.forEach(function(card) {
    card.addEventListener('click', function() {
      var projectId = card.getAttribute('data-project');
      if (projectId && projectsData[projectId]) {
        openModal(projectId);
      }
    });
  });

  function openModal(projectId) {
    currentProject = projectsData[projectId];
    currentImageIndex = 0;

    // Update modal content
    modalLabel.textContent = currentProject.label;
    modalTitle.textContent = currentProject.title;
    modalDescription.textContent = currentProject.description;

    // Update tech tags
    modalTech.innerHTML = '';
    currentProject.tech.forEach(function(tech) {
      var li = document.createElement('li');
      li.textContent = tech;
      modalTech.appendChild(li);
    });

    // Update gallery
    updateGallery();

    // Generate thumbnails
    galleryThumbnails.innerHTML = '';
    currentProject.images.forEach(function(img, index) {
      var thumb = document.createElement('div');
      thumb.className = 'gallery-thumb' + (index === 0 ? ' active' : '');
      thumb.innerHTML = '<img src="' + img + '" alt="Thumbnail ' + (index + 1) + '">';
      thumb.addEventListener('click', function() {
        currentImageIndex = index;
        updateGallery();
      });
      galleryThumbnails.appendChild(thumb);
    });

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateGallery() {
    if (!currentProject) return;

    galleryImage.src = currentProject.images[currentImageIndex];
    galleryCounter.textContent = (currentImageIndex + 1) + ' / ' + currentProject.images.length;

    // Update thumbnails
    var thumbs = galleryThumbnails.querySelectorAll('.gallery-thumb');
    thumbs.forEach(function(thumb, index) {
      if (index === currentImageIndex) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  function nextImage() {
    if (!currentProject) return;
    currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
    updateGallery();
  }

  function prevImage() {
    if (!currentProject) return;
    currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
    updateGallery();
  }

  // Event listeners
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  galleryNext.addEventListener('click', nextImage);
  galleryPrev.addEventListener('click', prevImage);

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  });

});