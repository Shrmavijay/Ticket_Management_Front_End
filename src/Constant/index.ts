export interface EnvironmentInterface {
    baseUrl: string;
  }
  
  const environment: EnvironmentInterface = {
    baseUrl: import.meta.env.VITE_BASE_URL
  };
  
  export default environment;