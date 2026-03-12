import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { 
  fetchDashboardDataRequest, 
  fetchDashboardDataSuccess, 
  fetchDashboardDataFailure 
} from './dashboardSlice';
import { apiWithAuth } from './authSaga';

// Mock data based on the provided image
const mockStats = {
  newTickets: { value: 43, change: '+6%' },
  closedToday: { value: 17, change: '-3%' },
  newReplies: { value: 7, change: '+9%' },
  followers: { value: '27.3k', change: '+3%' },
  dailyEarnings: { value: '$95', change: '-2%' },
  products: { value: 621, change: '-1%' }
};

const mockActivityData = [
  { name: 'Day 1', Purchases: 10 },
  { name: 'Day 2', Purchases: 15 },
  { name: 'Day 3', Purchases: 12 },
  { name: 'Day 4', Purchases: 25 },
  { name: 'Day 5', Purchases: 18 },
  { name: 'Day 6', Purchases: 14 },
  { name: 'Day 7', Purchases: 35 },
  { name: 'Day 8', Purchases: 22 },
  { name: 'Day 9', Purchases: 20 },
  { name: 'Day 10', Purchases: 40 },
  { name: 'Day 11', Purchases: 38 },
];

const mockUsers = [
  { id: 1, name: 'Ronald Bradley', commit: 'Initial commit', date: 'May 6, 2018', initial: 'RB' },
  { id: 2, name: 'Russell Gibson', commit: 'Main structure', date: 'April 22, 2018', initial: 'BM' },
  { id: 3, name: 'Beverly Armstrong', commit: 'Left sidebar adjustments', date: 'April 15, 2018', initial: 'BA' }
];

const mockPieData = [
  { name: 'Chrome', value: 47.4, fill: '#1e293b' },
  { name: 'Safari', value: 33.1, fill: '#3b82f6' },
  { name: 'Firefox', value: 10.5, fill: '#94a3b8' },
  { name: 'Edge', value: 9.0, fill: '#cbd5e1' }
];

const mockDonutData = [
  { name: 'Completed', value: 63.0, fill: '#84cc16' }, // Lime Green
  { name: 'Remaining', value: 37.0, fill: '#bef264' }  // Light Lime Green
];

function* fetchDashboardData() {
  try {
    // Instead of raw delay, simulate an API call passed through the watchdog
    const simulateDashboardApi = () => new Promise(resolve => setTimeout(resolve, 800));
    
    // apiWithAuth intercepts this and handles token refresh automatically
    yield call(apiWithAuth, simulateDashboardApi);
    
    // Dispatch success with mock data
    yield put(fetchDashboardDataSuccess({
      stats: mockStats,
      activityData: mockActivityData,
      users: mockUsers,
      pieData: mockPieData,
      donutData: mockDonutData,
    }));
  } catch (error) {
    yield put(fetchDashboardDataFailure(error.message));
  }
}

export function* dashboardSaga() {
  yield takeLatest(fetchDashboardDataRequest.type, fetchDashboardData);
}
