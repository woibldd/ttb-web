import Cookies from 'js-cookie'

const userKey = 'user'
const sessionKey = 'ix_session_id'
const tokenKey = 'token'

export function setUser (userdata) {
  return localStorage.setItem(userKey, userdata)
}
export function getUser () {
  return localStorage.getItem(userKey)
}
export function removeUser () {
  return localStorage.removeItem(userKey)
}

export function setSession (sessionId) {
  return Cookies.set(sessionKey, sessionId)
}
export function getSession () {
  return Cookies.get(sessionKey)
}
export function removeSession () {
  return Cookies.remove(sessionKey)
}

export function setToken (token) {
  return Cookies.set(tokenKey, token)
}
export function getToken () {
  return Cookies.get(tokenKey)
}
export function removeToken () {
  return Cookies.remove(tokenKey)
}
