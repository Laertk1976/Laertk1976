# ⭐ Star Rating Functions

A JavaScript library for generating star ratings for products and reviews.

## Features

- **Multiple Output Formats**: Unicode strings, HTML, or JavaScript arrays
- **Half-Star Support**: Handles decimal ratings (e.g., 4.2 stars)
- **Customizable**: Configurable maximum number of stars
- **Framework-Friendly**: Works with vanilla JS, React, Vue, etc.
- **Easy Integration**: Simple function to add stars to product objects

## Quick Start

### Basic Usage

```javascript
// Import the functions (if using modules)
const { addStarsToProduct, generateStarsUnicode } = require('./starRating.js');

// Create a product object
let product = {
    name: "Awesome Headphones",
    price: 99.99
};

// Add star rating (4.2 out of 5)
product = addStarsToProduct(product, 4.2);

console.log(product.rating.stars); // ★★★★☆
console.log(product.rating.value);  // 4.2
```

### Generate Stars Only

```javascript
// Unicode stars
const stars = generateStarsUnicode(3.5); // ★★★☆☆

// HTML stars
const htmlStars = generateStarsHTML(4.2);
// Returns: <div class="star-rating"><span class="star filled">★</span>...</div>

// Array format (useful for React/Vue)
const starsArray = generateStarsArray(2.8);
// Returns: [
//   { id: 1, type: 'filled', filled: true, half: false, empty: false },
//   { id: 2, type: 'filled', filled: true, half: false, empty: false },
//   { id: 3, type: 'half', filled: false, half: true, empty: false },
//   ...
// ]
```

## API Reference

### `addStarsToProduct(product, ratingValue, format)`

Adds a star rating to a product object.

**Parameters:**
- `product` (Object): The product object to modify
- `ratingValue` (Number): Rating value (0-5)
- `format` (String): Output format - 'unicode', 'html', or 'array' (default: 'unicode')

**Returns:** Modified product object with `rating.stars` and `rating.value` properties

### `generateStarsUnicode(rating, maxStars)`

Generates star rating as Unicode string.

**Parameters:**
- `rating` (Number): Rating value (0-maxStars)
- `maxStars` (Number): Maximum stars (default: 5)

**Returns:** String of star characters (★☆)

### `generateStarsHTML(rating, maxStars)`

Generates star rating as HTML string with CSS classes.

**Parameters:**
- `rating` (Number): Rating value (0-maxStars)
- `maxStars` (Number): Maximum stars (default: 5)

**Returns:** HTML string with star elements and CSS classes

### `generateStarsArray(rating, maxStars)`

Generates star rating as array of objects.

**Parameters:**
- `rating` (Number): Rating value (0-maxStars)
- `maxStars` (Number): Maximum stars (default: 5)

**Returns:** Array of star objects with properties: id, type, filled, half, empty

## Examples

### E-commerce Product Display

```javascript
const products = [
    { name: "Wireless Mouse", price: 29.99, userRating: 4.3 },
    { name: "Keyboard", price: 79.99, userRating: 3.8 },
    { name: "Monitor", price: 299.99, userRating: 4.7 }
];

products.forEach(product => {
    addStarsToProduct(product, product.userRating, 'html');
    console.log(`${product.name}: ${product.rating.stars}`);
});
```

### React Component Usage

```jsx
function ProductRating({ rating }) {
    const stars = generateStarsArray(rating);
    
    return (
        <div className="rating">
            {stars.map(star => (
                <span 
                    key={star.id} 
                    className={`star ${star.type}`}
                >
                    {star.filled ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
}
```

### Custom Star Count

```javascript
// 10-star rating system
const tenStarRating = generateStarsUnicode(7.5, 10);
console.log(tenStarRating); // ★★★★★★★☆☆☆
```

## CSS Styling

For HTML output, use these CSS classes:

```css
.star-rating {
    font-size: 20px;
    color: #ffd700;
}

.star.filled {
    color: #ffd700; /* Gold for filled stars */
}

.star.half {
    color: #ffd700; /* Gold for half stars */
}

.star.empty {
    color: #ddd; /* Light gray for empty stars */
}
```

## Demo

Open `example.html` in your browser to see a working demonstration of all the star rating functions.

## Browser Compatibility

Works in all modern browsers and Node.js environments. Uses ES6 features like:
- Arrow functions
- Template literals
- Default parameters

For older browser support, transpile with Babel.

## License

Free to use for any purpose.