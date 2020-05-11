export function state (){
  return {
    userData: {
      username: '',
      historys: []
    }
  }
}

export const mutations = {
  recordUser(state,{username,historys}){
    state.userData = {username, historys};
  }
}