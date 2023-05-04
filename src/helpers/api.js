export const baseURL = 'https://gocar-backend-production.up.railway.app/api/v1';

export const createReservationAPI = (userID, reservation) => fetch(`${baseURL}/users/${userID}/reservations`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(reservation),
});

export const getReservationsAPI = (userID) => fetch(`${baseURL}/users/${userID}/reservations`);
