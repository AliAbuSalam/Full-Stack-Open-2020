import axios from 'axios';

const url = '/api/persons';

const getAll = () => {
	return axios
		.get(url)
		.then(response => response.data);
}

const input = (phoneNumber) => {
	return axios
		.post(url, phoneNumber)
		.then(response => response.data);
}

const deleteEntry = (entryID) => {
  return axios
    .delete(`${url}/${entryID}`)
    .then(response => response.data);
}

const updateEntry = (changedEntry) => {
  return axios
    .put(`${url}/${changedEntry.id}`, changedEntry)
    .then(response => response.data);
}

export default { getAll, input, deleteEntry, updateEntry };

