// lib/attom.js (using axios)
import axios from 'axios';

const ATTOM_API_KEY = process.env.ATTOM_API_KEY;

export async function searchProperties(searchTerm) {
  try {
    const response = await axios.get('https://api.attomdata.com/property/v1/search', {
      params: { // Use the `params` option for query parameters
        address1: searchTerm,
        // city: searchTerm, // Add other search parameters as needed
        // zip: searchTerm,
      },
      headers: {
        'apikey': ATTOM_API_KEY,
        'Accept': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Attom API Error:", error);
    return null;
  }
}

export async function getPropertyDetails(attomId) {
    try {
        const response = await axios.get('https://api.attomdata.com/property/v1/detail', {
            params: {
                id: attomId
            },
            headers: {
                'apikey': ATTOM_API_KEY,
                'Accept': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Attom Details API Error:", error);
        return null;
    }
}

// ... other Attom API functions