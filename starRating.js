/**
 * Star Rating Functions for Product Reviews
 * Various approaches to generate star ratings
 */

/**
 * Generate star rating using Unicode star characters
 * @param {number} rating - Rating value (0-5)
 * @param {number} maxStars - Maximum number of stars (default: 5)
 * @returns {string} String of star characters
 */
function generateStarsUnicode(rating, maxStars = 5) {
    if (rating < 0 || rating > maxStars) {
        throw new Error(`Rating must be between 0 and ${maxStars}`);
    }
    
    const fullStar = '★';
    const emptyStar = '☆';
    const halfStar = '☆'; // Using same for simplicity, could use '⭐' for half
    
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars += fullStar;
    }
    
    // Add half star if needed
    if (hasHalfStar && fullStars < maxStars) {
        stars += halfStar;
    }
    
    // Add empty stars
    const remainingStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        stars += emptyStar;
    }
    
    return stars;
}

/**
 * Generate star rating as HTML string
 * @param {number} rating - Rating value (0-5)
 * @param {number} maxStars - Maximum number of stars (default: 5)
 * @returns {string} HTML string with star elements
 */
function generateStarsHTML(rating, maxStars = 5) {
    if (rating < 0 || rating > maxStars) {
        throw new Error(`Rating must be between 0 and ${maxStars}`);
    }
    
    let html = '<div class="star-rating">';
    
    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            html += '<span class="star filled">★</span>';
        } else if (i - 0.5 <= rating) {
            html += '<span class="star half">☆</span>';
        } else {
            html += '<span class="star empty">☆</span>';
        }
    }
    
    html += '</div>';
    return html;
}

/**
 * Generate star rating as an array of objects
 * Useful for frameworks like React, Vue, etc.
 * @param {number} rating - Rating value (0-5)
 * @param {number} maxStars - Maximum number of stars (default: 5)
 * @returns {Array} Array of star objects
 */
function generateStarsArray(rating, maxStars = 5) {
    if (rating < 0 || rating > maxStars) {
        throw new Error(`Rating must be between 0 and ${maxStars}`);
    }
    
    const stars = [];
    
    for (let i = 1; i <= maxStars; i++) {
        let type = 'empty';
        if (i <= rating) {
            type = 'filled';
        } else if (i - 0.5 <= rating) {
            type = 'half';
        }
        
        stars.push({
            id: i,
            type: type,
            filled: type === 'filled',
            half: type === 'half',
            empty: type === 'empty'
        });
    }
    
    return stars;
}

/**
 * Main function to add stars to product rating
 * @param {Object} product - Product object
 * @param {number} ratingValue - Rating value (0-5)
 * @param {string} format - Output format: 'unicode', 'html', 'array'
 * @returns {Object} Product object with stars added to rating
 */
function addStarsToProduct(product, ratingValue, format = 'unicode') {
    // Ensure product has rating object
    if (!product.rating) {
        product.rating = {};
    }
    
    // Add the rating value
    product.rating.value = ratingValue;
    
    // Generate stars based on format
    switch (format) {
        case 'unicode':
            product.rating.stars = generateStarsUnicode(ratingValue);
            break;
        case 'html':
            product.rating.stars = generateStarsHTML(ratingValue);
            break;
        case 'array':
            product.rating.stars = generateStarsArray(ratingValue);
            break;
        default:
            product.rating.stars = generateStarsUnicode(ratingValue);
    }
    
    return product;
}

// Example usage and testing
function demonstrateStarRating() {
    console.log('=== Star Rating Examples ===\n');
    
    // Example product
    let product = {
        name: "Awesome Product",
        price: 29.99
    };
    
    // Test different ratings
    const ratings = [0, 1.5, 2.5, 3, 4.2, 5];
    
    ratings.forEach(rating => {
        console.log(`Rating ${rating}:`);
        console.log(`Unicode: ${generateStarsUnicode(rating)}`);
        console.log(`HTML: ${generateStarsHTML(rating)}`);
        console.log(`Array:`, generateStarsArray(rating));
        console.log('---');
    });
    
    // Add stars to product
    product = addStarsToProduct(product, 4.2);
    console.log('\nProduct with stars:');
    console.log(JSON.stringify(product, null, 2));
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateStarsUnicode,
        generateStarsHTML,
        generateStarsArray,
        addStarsToProduct,
        demonstrateStarRating
    };
}

// Run demonstration if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    demonstrateStarRating();
}