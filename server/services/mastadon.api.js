// mastadon api

// Importing required library
const axios = require('axios');

// Defining constants
const MASTODON_INSTANCE_URL = 'https://mastodon.social';
const LIMIT = 50;

// Function to fetch and format toots from Mastodon based on a search term
const fetchTootsForAi = async (searchTerm) => {
  try {
    // Making request to Mastodon API
    const response = await axios.get(`${MASTODON_INSTANCE_URL}/api/v1/timelines/tag/${searchTerm}`, {
      params: {
        limit: LIMIT
      }
    });

    // Extracting toots from the response
    const toots = response.data;

    // Formatting each toot by cleaning and structuring the data
    const formattedToots = toots.map(toot => {
      // Removing unwanted characters and formatting text
      const modifiedText = toot.content
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\n/g, "")
        .replace(/�/g, "")
        .replace(/\+/g, "")
        .replace(/[\u{1F600}-\u{1F6FF}]/gu, "");

      // Return the formatted toot data
      return {
        text: modifiedText,
        createdAt: toot.created_at,
        likes: toot.favourites_count,
        retweets: toot.reblogs_count,
        comments: toot.replies_count || 0,
      };
    });

    // Return the search term along with the formatted toots
    return {
      searchTerm: searchTerm,
      tweets: formattedToots,
    };
  } catch (error) {
    // Handle potential errors
    console.error(error);
    return [];
  }
}

// Exporting the fetch function
module.exports = fetchTootsForAi;