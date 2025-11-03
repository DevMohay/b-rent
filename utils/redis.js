import { Redis } from '@upstash/redis';

// Initialize Redis client with environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

/**
 * Get a value from Redis cache
 * @param {string} key - The cache key
 * @returns {Promise<any>} - The cached value or null
 */
export async function getCache(key) {
  try {
    const result = await redis.get(key);
    // Don't attempt to parse - let the caller handle parsing
    return result;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
}

/**
 * Set a value in Redis cache
 * @param {string} key - The cache key
 * @param {any} value - The value to cache
 * @param {number} expireSeconds - Expiration time in seconds (default: 300)
 * @returns {Promise<boolean>} - Success status
 */
export async function setCache(key, value, expireSeconds = 300) {
  try {
    // Ensure value is a string before storing
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await redis.set(key, stringValue, { ex: expireSeconds });
    return true;
  } catch (error) {
    console.error('Redis set error:', error);
    return false;
  }
}

/**
 * Delete a value from Redis cache
 * @param {string} key - The cache key to delete
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteCache(key) {
  try {
    await redis.del(key);
    return true;
  } catch (error) {
    console.error('Redis delete error:', error);
    return false;
  }
}

/**
 * Check if a key exists in Redis
 * @param {string} key - The cache key to check
 * @returns {Promise<boolean>} - Whether the key exists
 */
export async function hasCache(key) {
  try {
    return await redis.exists(key) === 1;
  } catch (error) {
    console.error('Redis exists error:', error);
    return false;
  }
}

export default redis;