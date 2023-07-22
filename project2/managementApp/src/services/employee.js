import apiCall from './api';

export const createEmployee = async ({ 
  email, 
  password,
  firstName,
  lastName
 }
  ) => {
  return await apiCall({
    url: `/api/employee/employeeSignup`,
    method: 'POST',
    data: { email, password, firstName, lastName }
  });
};

export const updateEmployee = async ({ 
  employeename,
  description, 
  price,
  quantity,
  imageurl,
  userId,
  employeeId
 }
  ) => {
    console.log("entered employeeid is:", employeeId);
  return await apiCall({
    url: `/api/users/${userId}/employees/${employeeId}`,
    method: 'PUT',
    data: { employeename,description, price,quantity,imageurl}
  });
};

export const fetchEmployees = async () => {
  return await apiCall({
    url: '/api/employees',
    method: 'GET'
  });
};


export const deleteEmployee = async ({ userId, employeeId }) => {
  return await apiCall({
    url: `/api/users/${userId}/employees/${employeeId}`,
    method: 'DELETE'
  });
};