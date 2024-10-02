import cities from './cities.json'
import users from './users.json'



export async function fetchCities() {
  return cities
}

export async function fetchUsers() {
  return users
}

export async function fetchCity(id) {
  return cities.find(city => city.id === id)
}

export async function fetchUser(id) {
  return users.find(user => user.id === id)
}

export { cities, users }
