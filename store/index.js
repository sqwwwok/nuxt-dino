class Range {
  constructor (start,end) {
    this.start = start;
    this.end = end;
  }
  include (min,max) {
    if(max!==undefined){
      return this.include(min) || this.include(max) || (this.start>min && this.end<max)
    }
    return this.start<=min && this.end>=min
  }
}

export const state = {
  userData: {
    username: '',
    historys: []
  },
  defaultRanges: [],
}

export const mutations = {
  recordUser(state,{username,historys}){
    state.userData = {username, historys};
  },
  addRange (state,{start,end}) {
    state.defaultRanges.push(
      new Range(start,end)
    )
  },
  removeRange (state,{start,end}) {
    var index = state.defaultRanges.findIndex(
      val => val.start==start && val.end == end);
    if(index!=-1) state.defaultRanges.splice(index,1)
  },
  clearAll (state) {
    state.defaultRanges = [];
  }
}