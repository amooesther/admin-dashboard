import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    loading: false,
    stats: null,
    activityData: [],
    users: [],
    pieData: [],
    donutData: [],
    error: null,
  },
  reducers: {
    fetchDashboardDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardDataSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.activityData = action.payload.activityData;
      state.users = action.payload.users;
      state.pieData = action.payload.pieData;
      state.donutData = action.payload.donutData;
    },
    fetchDashboardDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeUserRow: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    }
  },
});

export const { 
  fetchDashboardDataRequest, 
  fetchDashboardDataSuccess, 
  fetchDashboardDataFailure,
  removeUserRow 
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
