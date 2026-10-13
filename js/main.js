/**
 * Progressive Tours & Travels - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Header Sticky Effect ---
  const header = document.getElementById('mainHeader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Mobile Drawer Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeDrawerFunc = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (closeDrawer) {
    closeDrawer.addEventListener('click', closeDrawerFunc);
  }

  // Close drawer on clicking any drawer link
  const drawerLinks = document.querySelectorAll('.mobile-drawer .drawer-link, .mobile-drawer .drawer-sublink');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawerFunc();
    });
  });

  // --- Mobile Submenus Toggle (Services & About Us) ---
  const mobileServicesToggle = document.getElementById('mobileServicesToggle');
  const mobileServicesSubmenu = document.getElementById('mobileServicesSubmenu');
  if (mobileServicesToggle && mobileServicesSubmenu) {
    mobileServicesToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileServicesToggle.classList.toggle('open');
      mobileServicesSubmenu.classList.toggle('open');
    });
  }

  const mobileAboutToggle = document.getElementById('mobileAboutToggle');
  const mobileAboutSubmenu = document.getElementById('mobileAboutSubmenu');
  if (mobileAboutToggle && mobileAboutSubmenu) {
    mobileAboutToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileAboutToggle.classList.toggle('open');
      mobileAboutSubmenu.classList.toggle('open');
    });
  }

  // --- Desktop Dropdowns (Services & About Us) Accessibility ---
  const dropdownContainers = document.querySelectorAll('.nav-item-dropdown');

  dropdownContainers.forEach(container => {
    const toggle = container.querySelector('.dropdown-toggle');
    const menu = container.querySelector('.nav-dropdown-menu');

    if (toggle && menu) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 991) return;
        e.preventDefault();
        
        // Close other desktop dropdowns
        dropdownContainers.forEach(other => {
          if (other !== container) {
            const otherMenu = other.querySelector('.nav-dropdown-menu');
            if (otherMenu) otherMenu.classList.remove('show');
          }
        });

        menu.classList.toggle('show');
      });
    }
  });

  // Global click outside to close dropdowns
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      document.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });

  // Close desktop dropdown on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });

  // Close desktop dropdown when clicking an item
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
    });
  });

  // --- Active Nav Link Highlighting on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      
      const desktopNavMatch = document.querySelector(`.nav-list a[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-list a').forEach(a => a.classList.remove('active'));
        if (desktopNavMatch) {
          desktopNavMatch.classList.add('active');
        }
      }
    });
  });

  // --- Job Filter Tabs ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const jobCards = document.querySelectorAll('.job-vacancy-card');

  if (filterBtns.length > 0 && jobCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        jobCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- FAQ Accordion ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      const isOpen = parent.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current
      if (!isOpen) {
        parent.classList.add('active');
      }
    });
  });

  // --- Quick Apply Modal ---
  const jobApplyModal = document.getElementById('jobApplyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalJobTitle = document.getElementById('modalJobTitle');
  const modalSelectedJob = document.getElementById('modalSelectedJob');
  const modalApplyForm = document.getElementById('modalApplyForm');
  const openModalButtons = document.querySelectorAll('.open-apply-modal');

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const jobTitle = btn.getAttribute('data-job') || 'Job Application';
      if (modalJobTitle) modalJobTitle.textContent = `Apply for: ${jobTitle}`;
      if (modalSelectedJob) modalSelectedJob.value = jobTitle;
      if (jobApplyModal) jobApplyModal.classList.add('open');
    });
  });

  if (modalCloseBtn && jobApplyModal) {
    modalCloseBtn.addEventListener('click', () => {
      jobApplyModal.classList.remove('open');
    });
  }

  if (jobApplyModal) {
    jobApplyModal.addEventListener('click', (e) => {
      if (e.target === jobApplyModal) {
        jobApplyModal.classList.remove('open');
      }
    });
  }

  if (modalApplyForm) {
    modalApplyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('modalFeedback');
      if (feedback) {
        feedback.innerHTML = '<span style="color: #16a34a; font-weight: 600;">✓ Application submitted! Our Cyprus recruitment officer will contact you shortly.</span>';
      }
      setTimeout(() => {
        if (jobApplyModal) jobApplyModal.classList.remove('open');
        modalApplyForm.reset();
        if (feedback) feedback.innerHTML = '';
      }, 2000);
    });
  }
});
