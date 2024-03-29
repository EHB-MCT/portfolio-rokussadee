import axios from "./axios"

class ApiService{
  constructor() {
    console.log(axios)
  }
  async getHome() {
    const response = await axios.get('/');
    console.log(response)
    return response
  }
  async createNewRoom(id) {
    const response = await axios.post('/rooms/save-room', {
      room_id: id
    })
    console.log(response)
    return response
  }
  async createNewUser(userName) {
    const response = await axios.post('users/save-user', {
      user_name: userName
    })
    return response
  }
  async saveRelationship(dbID, userID) {
    const response = await axios.post('rooms/save-relationship', {
      room_id: dbID,
      user_id: userID
    })
    return response
  }
  async getAllUsers() {
    console.log('ApiService/getAllUsers gets hit')
    const response = await axios.get('/rooms/allusers');
    console.log('ApiService/getAllUsers:',response)
    return response
  }
}
export const apiService = new ApiService();
