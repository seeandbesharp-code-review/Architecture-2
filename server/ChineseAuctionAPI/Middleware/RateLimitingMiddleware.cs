// RateLimitingMiddleware.cs - Middleware to apply rate limiting to all requests
using ChineseAuctionAPI.Services.RateLimiting;
using System.Net;

namespace ChineseAuctionAPI.Middleware
{
    public class RateLimitingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RateLimitingMiddleware> _logger;

        public RateLimitingMiddleware(RequestDelegate next, ILogger<RateLimitingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, IRateLimitingService rateLimitingService, IConfiguration configuration)
        {
            // Get client identifier (IP address)
            var identifier = context.Request.HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            
            // If user is authenticated, use user ID instead
            if (context.User?.FindFirst("id") is { } claim)
            {
                identifier = $"user:{claim.Value}";
            }

            // Skip rate limiting for health check endpoints
            if (context.Request.Path.StartsWithSegments("/health"))
            {
                await _next(context);
                return;
            }

            // Get configuration
            var rateLimitSection = configuration.GetSection("RateLimit");
            var maxRequests = int.Parse(rateLimitSection["MaxRequests"] ?? "100");
            var windowSeconds = int.Parse(rateLimitSection["WindowSeconds"] ?? "60");

            // Check rate limit
            var isAllowed = await rateLimitingService.IsRequestAllowedAsync(identifier, maxRequests, windowSeconds);

            if (!isAllowed)
            {
                context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsJsonAsync(new
                {
                    error = "Rate limit exceeded",
                    message = $"Maximum {maxRequests} requests per {windowSeconds} seconds exceeded",
                    timestamp = DateTime.UtcNow
                });

                _logger.LogWarning($"Rate limit exceeded for {identifier}");
                return;
            }

            await _next(context);
        }
    }

    /// <summary>
    /// Extension method to register rate limiting middleware
    /// </summary>
    public static class RateLimitingExtensions
    {
        public static IApplicationBuilder UseRateLimiting(this IApplicationBuilder app)
        {
            return app.UseMiddleware<RateLimitingMiddleware>();
        }
    }
}
