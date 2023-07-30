import apiCall from './api';

export const createToken = async ({ 
    email,
    name,
    link,
    url
 }
  ) => {
    // /api/users/:userid/carts/:productid
  return await apiCall({
    url: `/api/createtoken`,
    method: 'POST',
    data: {    email,name, link,url }
  });
};


export const fetchTokens = async () => {
    return await apiCall({
      url: '/api/token',
      method: 'GET'
    });
};