export interface EnvironmentInterface {
    // SERVER_PORT: number;
    // IP_ADDRESS : string;
    baseUrl: string;
  }
  
  const environment: EnvironmentInterface = {
    // SERVER_PORT: parseInt(import.meta.env.VITE_PORT || "3000", 10),
    // IP_ADDRESS: import.meta.env.VITE_IP_ADDRESS || 'localhost'
    baseUrl: import.meta.env.VITE_BASE_URL
  };
  
  export default environment;