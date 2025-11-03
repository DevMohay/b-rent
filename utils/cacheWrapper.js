import { getCache, setCache, deleteCache, hasCache } from './redis';

/**
 * Cache wrapper for data fetching functions
 * @param {Function} fetchFunction - The function that fetches data if not in cache
 * @param {string} cacheKey - The key to use for caching
 * @param {number} expireSeconds - Cache expiration time in seconds
 * @returns {Promise<any>} - The data from cache or fetch function
 */
export const withCache = async (fetchFunction, cacheKey, expireSeconds = 300) => {
  try {
    // Try to get data from cache first
    const cachedData = await getCache(cacheKey);
    
    if (cachedData) {
      console.log(`🔵 REDIS CACHE HIT for key: ${cacheKey}`);
      try {
        return JSON.parse(cachedData);
      } catch (parseError) {
        console.error(`❌ Error parsing cached data for key ${cacheKey}:`, parseError);
        // If parsing fails, invalidate the cache and fetch fresh data
        await invalidateCache(cacheKey);
      }
    } else {
      console.log(`🔴 REDIS CACHE MISS for key: ${cacheKey}, fetching data...`);
    }
    
    // If not in cache or parsing failed, fetch the data
    const data = await fetchFunction();
    
    // Cache the result if it's not null or undefined
    if (data !== null && data !== undefined) {
      try {
        // Ensure data is properly serialized
        const serializedData = JSON.stringify(data);
        await setCache(cacheKey, serializedData, expireSeconds);
        console.log(`🟢 REDIS CACHE SET for key: ${cacheKey}`);
      } catch (cacheError) {
        console.error(`❌ Error caching data for key ${cacheKey}:`, cacheError);
        // Continue without caching if there's an error
      }
    }
    
    return data;
  } catch (error) {
    console.error(`❌ Cache wrapper error for key ${cacheKey}:`, error);
    // Fallback to direct data fetch if caching fails
    return await fetchFunction();
  }
};

/**
 * Clear cache for a specific key
 * @param {string} cacheKey - The cache key to invalidate
 */
export async function invalidateCache(cacheKey) {
  await deleteCache(cacheKey);
}

/**
 * Generate a cache key with prefix and parameters
 * @param {string} prefix - Cache key prefix
 * @param {Object} params - Parameters to include in the key
 * @returns {string} - The generated cache key
 */
export function generateCacheKey(prefix, params = {}) {
  const paramString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}:${value}`)
    .join('_');
    
  return `${prefix}${paramString ? '_' + paramString : ''}`;
}