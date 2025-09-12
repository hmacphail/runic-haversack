/**
 * Photo Switcher - Client-side image gallery functionality
 * Handles navigation, keyboard controls, and dot indicators
 */

export class PhotoSwitcher {
  constructor(containerId, images) {
    this.containerId = containerId;
    this.images = images;
    this.currentImageIndex = 0;
    this.totalImages = images.length;
    
    // Get DOM elements
    this.imageElement = document.getElementById(`${containerId}-image`);
    this.prevButton = document.getElementById(`${containerId}-prev`);
    this.nextButton = document.getElementById(`${containerId}-next`);
    this.imageContainer = this.imageElement?.parentElement;
    
    // Get all dot buttons
    this.dotButtons = [];
    for (let i = 0; i < this.totalImages; i++) {
      const dot = document.getElementById(`${containerId}-dot-${i}`);
      if (dot) this.dotButtons.push(dot);
    }
    
    this.init();
  }
  
  init() {
    if (!this.imageElement) {
      console.warn(`PhotoSwitcher: Image element not found for ${this.containerId}`);
      return;
    }
    
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.setupTouchNavigation();
    this.updateImage(0); // Initialize first image
  }
  
  setupEventListeners() {
    // Arrow button listeners
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.showPrevImage());
    }
    
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.showNextImage());
    }
    
    // Dot button listeners
    this.dotButtons.forEach((dot, index) => {
      if (dot) {
        dot.addEventListener('click', () => this.updateImage(index));
      }
    });
  }
  
  setupKeyboardNavigation() {
    if (!this.imageContainer) return;
    
    this.imageContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.showPrevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.showNextImage();
      }
    });
    
    // Make container focusable for keyboard navigation
    this.imageContainer.setAttribute('tabindex', '0');
    this.imageContainer.setAttribute('aria-label', 'Image gallery. Use arrow keys to navigate.');
  }
  
  setupTouchNavigation() {
    if (!this.imageContainer) return;
    
    // Touch/swipe variables
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let isDragging = false;
    
    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50;
    // Maximum vertical deviation (to distinguish from vertical scroll)
    const maxVerticalDeviation = 100;
    
    const handleTouchStart = (e) => {
      // Only handle single touch
      if (e.touches.length !== 1) return;
      
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      isDragging = true;
      
      // Add a subtle visual feedback
      this.imageContainer.style.transition = 'transform 0.1s ease-out';
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      
      const touch = e.touches[0];
      touchEndX = touch.clientX;
      touchEndY = touch.clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = Math.abs(touchEndY - touchStartY);
      
      // If it's more of a horizontal swipe, prevent vertical scrolling
      if (Math.abs(deltaX) > 20 && deltaY < maxVerticalDeviation) {
        e.preventDefault();
        
        // Add subtle transform feedback during swipe
        const transformX = Math.max(-30, Math.min(30, deltaX * 0.3));
        this.imageElement.style.transform = `translateX(${transformX}px)`;
      }
    };
    
    const handleTouchEnd = (e) => {
      if (!isDragging) return;
      
      isDragging = false;
      
      // Reset visual feedback
      this.imageContainer.style.transition = '';
      this.imageElement.style.transform = '';
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = Math.abs(touchEndY - touchStartY);
      
      // Check if it's a valid horizontal swipe
      const isHorizontalSwipe = Math.abs(deltaX) >= minSwipeDistance && deltaY < maxVerticalDeviation;
      
      if (isHorizontalSwipe) {
        if (deltaX > 0) {
          // Swipe right - show previous image
          this.showPrevImage();
        } else {
          // Swipe left - show next image
          this.showNextImage();
        }
      }
      
      // Reset touch coordinates
      touchStartX = 0;
      touchStartY = 0;
      touchEndX = 0;
      touchEndY = 0;
    };
    
    const handleTouchCancel = () => {
      isDragging = false;
      this.imageContainer.style.transition = '';
      this.imageElement.style.transform = '';
      
      // Reset touch coordinates
      touchStartX = 0;
      touchStartY = 0;
      touchEndX = 0;
      touchEndY = 0;
    };
    
    // Add touch event listeners
    this.imageContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    this.imageContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    this.imageContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    this.imageContainer.addEventListener('touchcancel', handleTouchCancel, { passive: true });
  }
  
  updateImage(index) {
    if (index < 0 || index >= this.totalImages || !this.imageElement) return;
    
    this.currentImageIndex = index;
    this.imageElement.src = this.images[index];
    this.updateDotIndicators();
  }
  
  updateDotIndicators() {
    this.dotButtons.forEach((dot, i) => {
      if (dot) {
        if (i === this.currentImageIndex) {
          dot.classList.remove('bg-white/40');
          dot.classList.add('bg-white/80');
        } else {
          dot.classList.remove('bg-white/80');
          dot.classList.add('bg-white/40');
        }
      }
    });
  }
  
  showNextImage() {
    const nextIndex = (this.currentImageIndex + 1) % this.totalImages;
    this.updateImage(nextIndex);
  }
  
  showPrevImage() {
    const prevIndex = (this.currentImageIndex - 1 + this.totalImages) % this.totalImages;
    this.updateImage(prevIndex);
  }
}

/**
 * Initialize photo switcher for a given container
 * @param {string} containerId - Unique identifier for the photo switcher instance
 * @param {string[]} images - Array of image URLs
 */
export function initializePhotoSwitcher(containerId, images) {
  if (images && images.length > 1) {
    return new PhotoSwitcher(containerId, images);
  }
}

/**
 * Auto-initialize photo switchers from data attributes
 * Usage: Add data-photo-switcher="containerId" and data-images="[...]" to any element
 */
export function autoInitializePhotoSwitchers() {
  const elements = document.querySelectorAll('[data-photo-switcher]');
  
  elements.forEach(element => {
    const containerId = element.dataset.photoSwitcher;
    const imagesData = element.dataset.images;
    
    try {
      const images = JSON.parse(imagesData);
      initializePhotoSwitcher(containerId, images);
    } catch (error) {
      console.warn(`Failed to initialize photo switcher for ${containerId}:`, error);
    }
  });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitializePhotoSwitchers);
  } else {
    autoInitializePhotoSwitchers();
  }
}
