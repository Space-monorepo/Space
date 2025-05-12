export const useBypassAuth = () => {
  return process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true' && 
         process.env.NEXT_PUBLIC_NODE_ENV === 'development';
};