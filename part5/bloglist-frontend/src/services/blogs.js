import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const setToken = (loggedInToken) => {
  token = 'bearer ' + loggedInToken;
};

const postBlog = async (blogToPost) => {
  const config = {
    headers: { Authorization: token }
  };
  const result = await axios.post(baseUrl, blogToPost, config);
  return result.data;
};

const putBlog = async (blogToPut) => {
  const config = {
    headers: { Authorization: token }
  };
  const blogId = blogToPut.id;
  delete blogToPut.id;
  const result = await axios.put(`${baseUrl}/${blogId}`, blogToPut, config);
  return result.data;
};

const deleteBlog = async (idToDelete) => {
  const config = {
    headers: { Authorization: token }
  };
  const result = await axios.delete(`${baseUrl}/${idToDelete}`, config);
  return result.data;
};

export default { getAll, setToken, postBlog, putBlog, deleteBlog };