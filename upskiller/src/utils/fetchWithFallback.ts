/**
 * Fetches a resource with fallback to local file if CORS or other issues occur
 */
export const fetchWithFallback = async (
  scalewayUrl: string,
  localPath: string,
  options: RequestInit = {}
): Promise<Response> => {
  // Skip external requests during development (localhost)
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    console.log('Development mode detected, using local file:', localPath);
    const fallbackResponse = await fetch(localPath, options);
    if (fallbackResponse.ok) {
      console.log('Successfully fetched from local file');
      return fallbackResponse;
    } else {
      throw new Error(`Local file fetch failed: ${fallbackResponse.status}`);
    }
  }

  // Production: Try external first, then fallback to local
  try {
    console.log('Attempting to fetch from Scaleway:', scalewayUrl);
    const response = await fetch(scalewayUrl, options);
    
    if (response.ok) {
      console.log('Successfully fetched from Scaleway');
      return response;
    } else {
      console.warn('Scaleway fetch failed with status:', response.status);
      throw new Error(`Scaleway fetch failed: ${response.status}`);
    }
  } catch (error) {
    console.warn('Scaleway fetch failed, trying local fallback:', error);
    console.log('Falling back to local file:', localPath);
    
    try {
      const fallbackResponse = await fetch(localPath, options);
      if (fallbackResponse.ok) {
        console.log('Successfully fetched from local fallback');
        return fallbackResponse;
      } else {
        throw new Error(`Local fallback also failed: ${fallbackResponse.status}`);
      }
    } catch (fallbackError) {
      console.error('Both Scaleway and local fetch failed');
      throw fallbackError;
    }
  }
};

/**
 * Fetches JSON with fallback mechanism
 */
export const fetchJsonWithFallback = async (
  scalewayUrl: string,
  localPath: string
): Promise<any> => {
  const response = await fetchWithFallback(scalewayUrl, localPath, {
    headers: { 'Accept': 'application/json, */*' }
  });
  return response.json();
};

/**
 * Fetches text/markdown with fallback mechanism
 */
export const fetchTextWithFallback = async (
  scalewayUrl: string,
  localPath: string
): Promise<string> => {
  const response = await fetchWithFallback(scalewayUrl, localPath, {
    headers: { 'Accept': 'text/plain, text/markdown, */*' }
  });
  return response.text();
};