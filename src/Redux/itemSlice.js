import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'item',
  initialState: {
    value: 0,       // Example variable
    loginId: null,  // Login ID state
    repositories: [  // Array to store repositories with documents and files
      // Example structure
      {
        repoId: 'repo1',
        documents: [
          {
            docId: 'doc1',
            docType: 'docType1',
            files: [
              {
                fileId: 'file1',
                pageCount: 10
              },
              {
                fileId: 'file2',
                pageCount: 20
              }
            ]
          },
          {
            docId: 'doc2',
            docType: 'docType2',
            files: [
              {
                fileId: 'file3',
                pageCount: 15
              }
            ]
          }
        ]
      },
      {
        repoId: 'repo2',
        documents: [
          {
            docId: 'doc3',
            docType: 'docType3',
            files: [
              {
                fileId: 'file4',
                pageCount: 25
              }
            ]
          }
        ]
      }
    ],
    selectedRepository: {}, // Object to store the selected repository
  },
  reducers: {
    updateValue: (state, action) => {
      state.value = action.payload;
    },
    setLoginId: (state, action) => {
      state.loginId = action.payload;
    },
    addRepository: (state, action) => {
      state.repositories.push(action.payload);
    },
    updateRepository: (state, action) => {
      const { repoId, repository } = action.payload;
      const index = state.repositories.findIndex(repo => repo.repoId === repoId);
      if (index !== -1) {
        state.repositories[index] = repository;
      }
    },
    removeRepository: (state, action) => {
      const { repoId } = action.payload;
      state.repositories = state.repositories.filter(repo => repo.repoId !== repoId);
    },
    setSelectedRepository: (state, action) => {
      state.selectedRepository = action.payload;
    },
  },
});

export const { 
  updateValue, 
  setLoginId, 
  addRepository, 
  updateRepository, 
  removeRepository,
  setSelectedRepository,
} = itemSlice.actions;

export default itemSlice.reducer;
