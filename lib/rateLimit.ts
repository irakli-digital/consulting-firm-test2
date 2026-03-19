const submissions = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_SUBMISSIONS = 5;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissions.get(ip) || [];

  // Remove old entries outside the window
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_SUBMISSIONS) {
    submissions.set(ip, recent);
    return false; // rate limited
  }

  recent.push(now);
  submissions.set(ip, recent);

  // Cleanup old IPs periodically (every 100 checks)
  if (Math.random() < 0.01) {
    for (const [key, times] of submissions) {
      const valid = times.filter((t) => now - t < WINDOW_MS);
      if (valid.length === 0) submissions.delete(key);
      else submissions.set(key, valid);
    }
  }

  return true; // allowed
}
