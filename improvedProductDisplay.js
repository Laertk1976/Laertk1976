// Import the star rating functions
// const { generateStarsUnicode } = require('./starRating.js'); // If using Node.js modules
// Or include starRating.js via script tag in HTML

// Your original code (working but manual):
function displayProductsOriginal(products) {
  let productsHtml = "";

  products.forEach((product) => {
    const stars = Math.floor(product.rating.stars);
    const halfStar = product.rating.stars % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - stars - halfStar;

    let starHtml = "★".repeat(stars);
    if (halfStar) starHtml += "½";
    starHtml += "☆".repeat(emptyStars);

    productsHtml += `
    <div class="product box scroll-animate">
    <img src="${product.image}"/>
    <div>
    <h3>${product.name}</h3>
    </div>
    <div> 
    <div> ${product.rating.stars}</div>
    <div class="stars">${starHtml}</div>
    </div>
    <div>Rating count: ${product.rating.count}</div>
    <p>Price:$ ${formatCurrency(product.priceCents)}</p>
    <button class="add-to-cart-button 
    js-add-to-cart"
    data-product-id="${product.id}">Add to Cart</button>
  </div>
    `;
  });
  document.querySelector(".js-container").innerHTML = productsHtml;
}

// Improved version using the star rating functions:
function displayProductsImproved(products) {
  let productsHtml = "";

  products.forEach((product) => {
    // Use the star rating function instead of manual calculation
    const starHtml = generateStarsUnicode(product.rating.stars);

    productsHtml += `
    <div class="product box scroll-animate">
      <img src="${product.image}"/>
      <div>
        <h3>${product.name}</h3>
      </div>
      <div> 
        <div>${product.rating.stars}</div>
        <div class="stars">${starHtml}</div>
      </div>
      <div>Rating count: ${product.rating.count}</div>
      <p>Price: $${formatCurrency(product.priceCents)}</p>
      <button class="add-to-cart-button js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
    `;
  });
  
  document.querySelector(".js-container").innerHTML = productsHtml;
}

// Even better version with HTML star format for better styling:
function displayProductsWithStyledStars(products) {
  let productsHtml = "";

  products.forEach((product) => {
    // Generate HTML stars with CSS classes for better styling
    const starHtml = generateStarsHTML(product.rating.stars);

    productsHtml += `
    <div class="product box scroll-animate">
      <img src="${product.image}" alt="${product.name}"/>
      <div>
        <h3>${product.name}</h3>
      </div>
      <div class="rating-section"> 
        <div class="rating-value">${product.rating.stars}</div>
        ${starHtml}
      </div>
      <div class="rating-count">Rating count: ${product.rating.count}</div>
      <p class="price">Price: $${formatCurrency(product.priceCents)}</p>
      <button class="add-to-cart-button js-add-to-cart" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
    `;
  });
  
  document.querySelector(".js-container").innerHTML = productsHtml;
}

// Template-based approach for even cleaner code:
function displayProductsTemplate(products) {
  const productTemplate = (product) => {
    const starHtml = generateStarsUnicode(product.rating.stars);
    
    return `
      <div class="product box scroll-animate">
        <img src="${product.image}" alt="${product.name}"/>
        <div>
          <h3>${product.name}</h3>
        </div>
        <div class="rating-section"> 
          <div class="rating-value">${product.rating.stars}</div>
          <div class="stars">${starHtml}</div>
        </div>
        <div class="rating-count">Rating count: ${product.rating.count}</div>
        <p class="price">Price: $${formatCurrency(product.priceCents)}</p>
        <button class="add-to-cart-button js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  };

  const productsHtml = products.map(productTemplate).join('');
  document.querySelector(".js-container").innerHTML = productsHtml;
}

// Modern approach using array methods and the star functions:
function displayProductsModern(products) {
  const container = document.querySelector(".js-container");
  
  container.innerHTML = products
    .map(product => {
      const stars = generateStarsUnicode(product.rating.stars);
      return `
        <div class="product box scroll-animate">
          <img src="${product.image}" alt="${product.name}"/>
          <div>
            <h3>${product.name}</h3>
          </div>
          <div class="rating-section"> 
            <div class="rating-value">${product.rating.stars}</div>
            <div class="stars">${stars}</div>
          </div>
          <div class="rating-count">Rating count: ${product.rating.count}</div>
          <p class="price">Price: $${formatCurrency(product.priceCents)}</p>
          <button class="add-to-cart-button js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    })
    .join('');
}

// Example usage with sample data:
function demonstrateProductDisplay() {
  // Sample products data
  const sampleProducts = [
    {
      id: "1",
      name: "Wireless Headphones",
      image: "https://via.placeholder.com/200x200",
      rating: { stars: 4.2, count: 156 },
      priceCents: 9999
    },
    {
      id: "2", 
      name: "Smart Watch",
      image: "https://via.placeholder.com/200x200",
      rating: { stars: 3.8, count: 89 },
      priceCents: 19999
    },
    {
      id: "3",
      name: "Bluetooth Speaker", 
      image: "https://via.placeholder.com/200x200",
      rating: { stars: 4.7, count: 234 },
      priceCents: 4999
    }
  ];

  // Mock formatCurrency function
  window.formatCurrency = function(cents) {
    return (cents / 100).toFixed(2);
  };

  // You can use any of these approaches:
  // displayProductsOriginal(sampleProducts);      // Your original code
  // displayProductsImproved(sampleProducts);      // Simplified with star function
  // displayProductsWithStyledStars(sampleProducts); // With HTML stars for styling
  // displayProductsTemplate(sampleProducts);      // Template-based approach
  displayProductsModern(sampleProducts);           // Modern functional approach
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    displayProductsOriginal,
    displayProductsImproved,
    displayProductsWithStyledStars,
    displayProductsTemplate,
    displayProductsModern,
    demonstrateProductDisplay
  };
}