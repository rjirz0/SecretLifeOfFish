// Minimal JavaScript for website interactions

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Trailer Modal Toggle
  const trailerModal = document.getElementById('trailer-modal');
  const openModalBtns = [
    document.getElementById('trailer-nav-btn'),
    document.getElementById('trailer-mobile-btn'),
    document.getElementById('hero-trailer-btn'),
    document.getElementById('poster-play-btn'),
  ];
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');

  const openTrailer = () => {
    if (trailerModal) {
      trailerModal.classList.remove('hidden');
      trailerModal.classList.add('flex');
    }
  };

  const closeTrailer = () => {
    if (trailerModal) {
      trailerModal.classList.add('hidden');
      trailerModal.classList.remove('flex');
    }
  };

  openModalBtns.forEach((btn) => {
    if (btn) btn.addEventListener('click', openTrailer);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeTrailer);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeTrailer);

  // Close modal when clicking dark overlay
  if (trailerModal) {
    trailerModal.addEventListener('click', (e) => {
      if (e.target === trailerModal) {
        closeTrailer();
      }
    });
  }

  // Species Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const speciesCards = document.querySelectorAll('.species-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update button active styling
      filterBtns.forEach((b) => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'shadow-md');
        b.classList.add('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800');
      });

      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'shadow-md');

      const filter = btn.getAttribute('data-filter');

      speciesCards.forEach((card) => {
        if (filter === 'all' || card.classList.contains(filter || '')) {
          (card as HTMLElement).style.display = 'block';
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    });
  });
});
