import { MutationTree, ActionTree, Module } from 'vuex'
import { ipcRenderer } from 'electron'

import { RootState } from '../index'

type FileType = {
  path: string,
  displayName: string,
  isFile: boolean,
  fileType: string,
  data: string
}

export type ExplorerState = {
  fileList: FileType[]
}

const state = ():ExplorerState => ({
  fileList: []
})

const actions: ActionTree<ExplorerState, RootState> = {
  initialize({ dispatch }){
    ipcRenderer.send('getFiles')
    ipcRenderer.on('receiveFiles', (event: Event, fileList: any[]) => {
      dispatch('setFileList', fileList)
    })
  },
  setFileList({ commit }, fileList) {
    commit('setFileList', fileList)
  },
  selectFolder(_, path) {
    ipcRenderer.send('getFiles', path)
  }
}

const mutations: MutationTree<ExplorerState> = {
  setFileList(state: ExplorerState, fileList:FileType[]) {
    state.fileList = fileList
  }
}


const Explorer = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
}

export default Explorer