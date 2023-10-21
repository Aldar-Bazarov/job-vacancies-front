interface Configuration {
  baseUrl: string;
}

export function getConfiguration(): Configuration {
  return {
    baseUrl: import.meta.env.VITE_BASE_API_URL
  };
}

export function getBaseApi(): string | undefined {
  const { baseUrl } = getConfiguration();
  return baseUrl;
}
