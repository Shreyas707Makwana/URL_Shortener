// Characters used for Base62 encoding (0-9, a-z, A-Z)
const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = CHARACTERS.length; // 62

/**
 * Encodes a number to a Base62 string
 * @param {Number} num - The number to encode
 * @return {String} The encoded Base62 string
 */
function encode(num) {
  // Check if num is a valid number
  if (typeof num !== 'number' || isNaN(num) || num < 0) {
    throw new Error('Input must be a non-negative number');
  }
  
  // Handle the special case of zero
  if (num === 0) {
    return CHARACTERS[0];
  }
  
  let encoded = '';
  
  // Convert the number to Base62
  while (num > 0) {
    encoded = CHARACTERS[num % BASE] + encoded;
    num = Math.floor(num / BASE);
  }
  
  return encoded;
}

/**
 * Decodes a Base62 string back to a number
 * @param {String} str - The Base62 string to decode
 * @return {Number} The decoded number
 */
function decode(str) {
  // Check if str is a valid string
  if (typeof str !== 'string' || str.length === 0) {
    throw new Error('Input must be a non-empty string');
  }
  
  let decoded = 0;
  
  // Convert the Base62 string back to a number
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const index = CHARACTERS.indexOf(char);
    
    // If character is not found in our Base62 character set
    if (index === -1) {
      throw new Error(`Invalid character found: ${char}`);
    }
    
    // Multiply by base and add the character's value
    decoded = decoded * BASE + index;
  }
  
  return decoded;
}

module.exports = { encode, decode };