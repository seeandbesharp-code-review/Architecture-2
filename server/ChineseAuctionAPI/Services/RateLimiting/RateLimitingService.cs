// RateLimitingService.cs - Sliding Window Rate Limiter using Redis
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChineseAuctionAPI.Services.RateLimiting
{
    public interface IRateLimitingService
    {
        /// <summary>
        /// Checks if a request should be allowed based on rate limiting rules.
        /// Uses Sliding Window algorithm.
        /// </summary>
        /// <param name="identifier">Unique identifier (e.g., IP address, User ID)</param>
        /// <param name="maxRequests">Maximum number of requests allowed</param>
        /// <param name="windowSeconds">Time window in seconds</param>
        /// <returns>True if request is allowed, false if rate limit exceeded</returns>
        Task<bool> IsRequestAllowedAsync(string identifier, int maxRequests, int windowSeconds);

        /// <summary>
        /// Gets current request count for an identifier
        /// </summary>
        Task<int> GetRequestCountAsync(string identifier);

        /// <summary>
        /// Resets rate limit for an identifier
        /// </summary>
        Task ResetAsync(string identifier);
    }

    public class RateLimitingService : IRateLimitingService
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly ILogger<RateLimitingService> _logger;

        public RateLimitingService(IConnectionMultiplexer redis, ILogger<RateLimitingService> logger)
        {
            _redis = redis;
            _logger = logger;
        }

        /// <summary>
        /// Sliding Window algorithm implementation:
        /// 1. Remove old entries outside the current window
        /// 2. Check if current count is within limit
        /// 3. Add new request timestamp if allowed
        /// </summary>
        public async Task<bool> IsRequestAllowedAsync(string identifier, int maxRequests = 100, int windowSeconds = 60)
        {
            try
            {
                var db = _redis.GetDatabase();
                var key = $"rate_limit:{identifier}";
                var now = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
                var windowStart = now - (windowSeconds * 1000);

                // 1. Remove old entries (older than the window)
                await db.SortedSetRemoveRangeByScoreAsync(key, 0, windowStart);

                // 2. Get current count of requests in the window
                var currentCount = await db.SortedSetLengthAsync(key);

                // 3. Check if we're within limits
                if (currentCount < maxRequests)
                {
                    // Add new request timestamp
                    await db.SortedSetAddAsync(key, identifier, now);
                    
                    // Set expiration time (window + 1 second buffer)
                    await db.KeyExpireAsync(key, TimeSpan.FromSeconds(windowSeconds + 1));
                    
                    _logger.LogInformation($"Rate limit allowed for {identifier}. Requests: {currentCount + 1}/{maxRequests}");
                    return true;
                }
                else
                {
                    _logger.LogWarning($"Rate limit exceeded for {identifier}. Requests: {currentCount}/{maxRequests}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error checking rate limit for {identifier}");
                // In case of Redis failure, allow the request (fail-open approach)
                return true;
            }
        }

        /// <summary>
        /// Get current request count without modifying the limit
        /// </summary>
        public async Task<int> GetRequestCountAsync(string identifier)
        {
            try
            {
                var db = _redis.GetDatabase();
                var key = $"rate_limit:{identifier}";
                var count = await db.SortedSetLengthAsync(key);
                return (int)count;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting request count for {identifier}");
                return 0;
            }
        }

        /// <summary>
        /// Reset rate limit for an identifier
        /// </summary>
        public async Task ResetAsync(string identifier)
        {
            try
            {
                var db = _redis.GetDatabase();
                var key = $"rate_limit:{identifier}";
                await db.KeyDeleteAsync(key);
                _logger.LogInformation($"Rate limit reset for {identifier}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error resetting rate limit for {identifier}");
            }
        }
    }
}
