import apiCall from './api';

export const createHr = async ({ 
  email, 
  password,
  firstName,
  lastName
 }
  ) => {
  return await apiCall({
    url: `/api/hr/hrSignup`,
    method: 'POST',
    data: { email, password, firstName, lastName }
  });
};

export const updateHr = async ({ 
  hrId
 }
  ) => {
  return await apiCall({
    url: `/api/hr/${hrId}`,
    method: 'PUT',
    data: {}
  });
};

export const fetchHrs = async () => {
  return await apiCall({
    url: '/api/hr',
    method: 'GET'
  });
};


export const deleteHr = async ({ userId, hrId }) => {
  return await apiCall({
    url: `/api/users/${userId}/hrs/${hrId}`,
    method: 'DELETE'
  });
};