export const useBypassAuth = () => {
  return process.env.NEXT_PUBLIC_BYPASS_AUTH && 
         process.env.NEXT_PUBLIC_NODE_ENV;
};