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
  employeeId,
  firstName,
  lastName,
  address,
  cellPhone,
  ssn,
  birthday,
  gender,
  visaTitle,
  emergencyFirstName,
  emergencyLastName,
  emergencyRelationship,
  visaDocumentName,
  visaDocumentLink,
  visaDocumentStatus,
  visaDocumentFeedback
 }
  ) => {
  return await apiCall({
    url: `/api/employee/${employeeId}`,
    method: 'PUT',
    data: { 
      firstName, 
      lastName, 
      address,
      cellPhone,
      ssn,
      birthday,
      gender,
      visaTitle,
      emergencyFirstName,
      emergencyLastName,
      emergencyRelationship,
      visaDocumentName, 
      visaDocumentLink, 
      visaDocumentStatus, 
      visaDocumentFeedback,
    }
  });
};

export const fetchEmployees = async () => {
  return await apiCall({
    url: '/api/employee',
    method: 'GET'
  });
};


export const deleteEmployee = async ({ userId, employeeId }) => {
  return await apiCall({
    url: `/api/users/${userId}/employees/${employeeId}`,
    method: 'DELETE'
  });
};