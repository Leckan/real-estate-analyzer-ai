// lib/utils.js

// Utility function to format numbers as currency
export const formatCurrency = (number, currency = 'USD', locale = 'en-US') => {
    if (typeof number !== 'number') {
      return ''; // Or handle non-number inputs differently
    }
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(number);
  };
  
  // Utility function to format dates
  export const formatDate = (date, format = 'MM/DD/YYYY') => {
      if (!(date instanceof Date)) {
          date = new Date(date)
      }
  
      if (isNaN(date)) {
          return '';
      }
  
      const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
      }
  
      if (format === 'MM/DD/YYYY') {
          return date.toLocaleDateString('en-US', options);
      }
  
      // Add other date formats as needed
  
      return date.toLocaleDateString('en-US', options); // Default format
  };
  
  
  // Utility function to generate a random ID (UUID)
  export const generateUUID = () => {
    return crypto.randomUUID(); // Modern way (browser and Node.js)
    // Or use a library if you need wider browser compatibility:
    // npm install uuid
    // import { v4 as uuidv4 } from 'uuid';
    // return uuidv4();
  };
  
  // Utility function to truncate text
  export const truncateText = (text, maxLength) => {
    if (typeof text !== 'string') {
      return '';
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };
  
  
  // Function to check if a value is empty (null, undefined, or empty string)
  export const isEmpty = (value) => {
      return value === null || value === undefined || value === "";
  }
  


// Function to get time difference in human readable format
export const getTimeDifference = (date1, date2) => {
    const diffInSeconds = Math.floor((new Date(date2) - new Date(date1)) / 1000);

    const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
    const days = Math.floor((diffInSeconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24));
    const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(diffInSeconds % 60);

    const parts = [];

    if (years > 0) {
        parts.push(`${years} year${years > 1 ? 's' : ''}`);
    }

    if (days > 0) {
        parts.push(`${days} day${days > 1 ? 's' : ''}`);
    }

    if (hours > 0) {
        parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    }

    if (minutes > 0) {
        parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    }

    if (seconds > 0 || parts.length === 0) { // Show seconds only if other units are 0 or if the difference is very small
        parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
    }

    return parts.join(', ');
};
  // ... other utility functions as needed

  export const filterProperties = (properties, filters) => {
    return properties.filter(property => {
      // Implement your filtering logic here.  Example:
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.bedrooms && property.bedrooms !== filters.bedrooms) return false;
      // ... other filters
      return true;
    });
  };

  export const sortProperties = (properties, sortBy, sortDirection = 'asc') => {
    const sortedProperties = [...properties]; // Create a copy to avoid mutating the original array
  
    sortedProperties.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
  
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else { // desc
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  
    return sortedProperties;
  };
  export const paginate = (array, pageSize, pageNumber) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
  };

  export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Implementation using Haversine formula (or a library)
    const R = 6371; // Radius of the earth in km
    // ... (Haversine formula code)
};

export const capitalize = (str) => {
    if (typeof str !== 'string' || !str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  export const slugify = (str) => {
    if (typeof str !== 'string' || !str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  export const isEmailValid = (email) => {
    // Use a regular expression or a library for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex, you can use a more robust one
    return re.test(email);
  };

  export const isPhoneNumberValid = (phoneNumber) => {
    // Use a regular expression or a library for phone number validation.  This can be complex!
    // Example basic check (customize as needed):
    return /^\d{10}$/.test(phoneNumber); // 10-digit number
  };

  export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj)); // Simple but can have limitations with functions, dates, etc.
    // For more complex objects, consider a dedicated deep cloning library.
  };

  export const mergeObjects = (obj1, obj2) => {
    return { ...obj1, ...obj2 }; // Spread syntax for merging
  };

  export const arrayMove = (arr, fromIndex, toIndex) => {
    const newArr = Array.from(arr);
    const [removed] = newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, removed);
    return newArr;
  };

  export const formatPropertyType = (propertyType) => {
    if (typeof propertyType !== 'string' || !propertyType) return '';
    return propertyType.replace(/([A-Z])/g, ' $1').trim(); // Add spaces between capital letters
  };


  export const calculateMortgage = (principal, interestRate, term) => {
    const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly
    const numberOfPayments = term * 12;
  
    const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
  
    const monthlyPayment = numerator / denominator;
    return monthlyPayment;
  };

  export const roundNumber = (number, decimals = 0) => {
    const multiplier = Math.pow(10, decimals);
    return Math.round(number * multiplier) / multiplier;
  };

  export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/i.test(navigator.userAgent);
  };

  export const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  export const pluralize = (word, count, plural = null) => {
    if (count === 1) {
      return word;
    }
    return plural || word + 's'; // Default plural is just adding 's'
  };

  export const formatAddress = (address) => {
    if (!address) return '';
  
    const { streetNumber, streetName, city, state, zip } = address; // Assuming address is an object
  
    const parts = [];
    if (streetNumber) parts.push(streetNumber);
    if (streetName) parts.push(streetName);
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (zip) parts.push(zip);
  
    return parts.join(', ');
  };

  export const formatPropertySize = (size, unit = 'sqft') => {
    if (typeof size !== 'number' || isNaN(size)) return '';
    return `${size} ${unit}`;
  };

  export const formatPricePerSquareFoot = (price, size) => {
    if (typeof price !== 'number' || isNaN(price) || typeof size !== 'number' || isNaN(size) || size === 0) {
      return '';
    }
    const pricePerSqFt = price / size;
    return formatCurrency(pricePerSqFt); // Use formatCurrency from utils.js
  };


  export const formatBathrooms = (bathrooms) => {
    if (typeof bathrooms !== 'number' || isNaN(bathrooms)) return '';
    return `<span class="math-inline">\{bathrooms\} Bath</span>{bathrooms > 1 ? 's' : ''}`;
  };

  export const calculatePropertyTax = (price, taxRate) => {
    if (typeof price !== 'number' || isNaN(price) || typeof taxRate !== 'number' || isNaN(taxRate)) {
      return '';
    }
    const tax = price * (taxRate / 100); // Assuming taxRate is a percentage
    return formatCurrency(tax);
  };

  export const calculateDownPayment = (price, downPaymentPercentage) => {
    if (typeof price !== 'number' || isNaN(price) || typeof downPaymentPercentage !== 'number' || isNaN(downPaymentPercentage)) {
      return '';
    }
    const downPayment = price * (downPaymentPercentage / 100);
    return formatCurrency(downPayment);
  };

  export const getPropertyImageUrl = (image) => {
    // Example: If images are stored in a specific folder or CDN
    return `/images/properties/${image}`; // Or use a CDN URL
  };

  export const formatPropertyStatus = (status) => {
    // Implement your formatting logic based on the possible status values
    switch (status) {
      case 'Active':
        return 'Active';
      case 'Pending':
        return 'Under Contract';
      // ... other cases
      default:
        return status;
    }
  };