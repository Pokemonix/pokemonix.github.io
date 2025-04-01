// Bootstrap Template Generated

// Navigation function
function navigateTo(url) {
    window.location.href = url;
  }
  
  // Loader handling
  window.addEventListener('load', () => {
    const loader = document.querySelector('.web-loader');
    
    if (loader) {
      loader.classList.add('web-loader--hidden');
      
      loader.addEventListener('transitionend', () => {
        if (loader.parentNode) {
          document.body.removeChild(loader);
        }
      });
    }
    
    // initialize carousel with custom settings
    initializeCarousel();
  });
  
  // Carousel initialization function
  function initializeCarousel() {
    // Make sure Bootstrap's carousel is properly initialized
    const carousel = document.getElementById('carouselPokemonix');
    
    if (carousel) {
      // Create a Bootstrap carousel instance with custom options
      const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000,      // 5 seconds per slide
        wrap: true,          // Continuous loop
        keyboard: true,      // Allow keyboard navigation
        pause: 'hover',      // Pause on hover
        touch: true          // Allow touch/swipe
      });
      
      // Force the carousel to trigger a resize to ensure images display properly
      window.dispatchEvent(new Event('resize'));
      
      // Add event listener for when slides change
      carousel.addEventListener('slide.bs.carousel', (event) => {
        console.log(`Moving from slide ${event.from} to slide ${event.to}`);
        
        // Ensure images are properly loaded
        const nextSlide = carousel.querySelector(`.carousel-item:nth-child(${event.to + 1}) img`);
        if (nextSlide && !nextSlide.complete) {
          nextSlide.onload = () => {
            // Image loaded successfully
            console.log('Carousel image loaded successfully');
          };
          
          nextSlide.onerror = () => {
            // Handle image loading error
            console.error('Failed to load carousel image');
            // You could replace with a fallback image if needed
            nextSlide.src = 'media/fallback-image.jpg';
          };
        }
      });
    }
  }
  
  // Featured items functionality
  document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.featured-item button');
    
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Get product details
        const itemContainer = e.target.closest('.featured-item');
        const itemTitle = itemContainer.querySelector('.featured-item-title').textContent;
        const itemPrice = itemContainer.querySelector('.featured-item-price').textContent;
        
        // You could add actual cart functionality here
        console.log(`Added to cart: ${itemTitle} - ${itemPrice}`);
        
        // Change button text temporarily to show feedback


        button.classList.add('btn-success');
        button.classList.remove('btn-outline-dark');
        
        // Reset button after 2 seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('btn-success');
          button.classList.add('btn-outline-dark');
        }, 2000);
      });
    });
  });
  
  // Navbar toggle functionality
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('change', () => {
      // Adjust main content margin when navbar width changes
      document.querySelector('main').style.transition = 'margin-left 0.2s';
      if (navToggle.checked) {
        document.querySelector('main').style.marginLeft = 'var(--navbar-width-min)';
      } else {
        document.querySelector('main').style.marginLeft = 'var(--navbar-width)';
      }
    });
  }

// Category Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const categoryContents = document.querySelectorAll('.category-content');
  
  // Initialize the Add to Cart functionality for all products
  initializeAddToCartButtons();
  
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get the category to show
      const categoryToShow = this.getAttribute('data-category');
      
      // Hide all category contents
      categoryContents.forEach(content => {
        content.classList.remove('active');
      });
      
      // Show the selected category content
      document.getElementById(categoryToShow).classList.add('active');
      
      // Log the selection
      console.log(`Selected category: ${categoryToShow}`);
      
      // Reinitialize add to cart buttons for newly visible items
      initializeAddToCartButtons();
    });
  });
  
  // Initially show the featured category
  document.getElementById('featured').classList.add('active');
});

// Function to initialize Add to Cart buttons for all products
function initializeAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll('.featured-item button');
  
  addToCartButtons.forEach(button => {
    // Remove any existing event listeners to prevent duplicates
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    newButton.addEventListener('click', (e) => {
      // Get product details
      const itemContainer = e.target.closest('.featured-item');
      const itemTitle = itemContainer.querySelector('.featured-item-title').textContent;
      const itemPrice = itemContainer.querySelector('.featured-item-price').textContent;
      
      // You could add actual cart functionality here
      console.log(`Added to cart: ${itemTitle} - ${itemPrice}`);
    });
  });
}
/*
function showModal(name, description, price, imageSrc) {
  // Create modal elements
  const modal = document.createElement('div');
  modal.classList.add('product-modal');
  
  const modalContent = document.createElement('div');
  modalContent.classList.add('product-modal-content');
  
  // Close button
  const closeBtn = document.createElement('span');
  closeBtn.classList.add('product-modal-close');
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => document.body.removeChild(modal);
  
  // Image section
  const imageDiv = document.createElement('div');
  imageDiv.classList.add('product-modal-image');
  const image = document.createElement('img');
  image.src = imageSrc;
  image.alt = name;
  imageDiv.appendChild(image);
  
  // Details section
  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('product-modal-details');
  
  const title = document.createElement('h3');
  title.textContent = name;
  
  const priceElement = document.createElement('div');
  priceElement.classList.add('product-modal-price');
  priceElement.textContent = price;
  
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;
  
  const addToCartBtn = document.createElement('button');
  addToCartBtn.classList.add( 'add-to-cart-btn', 'w-100', 'mt-3');
  addToCartBtn.textContent = 'Comfirm Checkout';
  addToCartBtn.onclick = () => {
    addToCart({name, description, price, imageSrc});
    document.body.removeChild(modal);
  };
  
  // Assemble modal content
  detailsDiv.append(title, priceElement, descriptionElement, addToCartBtn);
  modalContent.append(closeBtn, imageDiv, detailsDiv);
  modal.appendChild(modalContent);
  
  // Add to body
  document.body.appendChild(modal);
}
*/

let cartItems = [];

function addToCart(item) {
  // Add item to cart
  cartItems.push(item);
  
  // Update cart item count
  const cartItemCountElement = document.querySelector('.cart-item-count');
  if (cartItemCountElement) {
    cartItemCountElement.textContent = cartItems.length;
    cartItemCountElement.classList.add('active');
  }
  
  // Show cart notification
  showCartNotification(item);
}

function showCartNotification(item) {
  // Create notification element
  const notification = document.createElement('div');
  notification.classList.add('cart-notification');
  notification.textContent = '+1';
  
  // Add to body
  document.body.appendChild(notification);
  
  // Remove notification after animation
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}
