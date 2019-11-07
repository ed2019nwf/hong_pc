import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setInfo({ key, val }) {
  return Cookies.set(key, val)
}

export function getInfo(key) {
  return Cookies.get(key)
}

export function removeInfo(key){
  return Cookies.remove(key)
}
