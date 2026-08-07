import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardDataRequest, removeUserRow } from '../store/dashboardSlice';
import StatsCard from '../components/StatsCard';
import DocsAlert from '../components/DocsAlert';
import ChartCard from '../components/ChartCard';
import ActivityTable from '../components/ActivityTable';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { 
    loading, 
    stats, 
    activityData, 
    users, 
    pieData, 
    donutData, 
    error 
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardDataRequest());
  }, [dispatch]);

  const handleRemoveUser = (id) => {
    dispatch(removeUserRow(id));
  };

  if (loading) {
    return (
        <div className="flex h-64 items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tablerBlue"></div>
        </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading dashboard: {error}</div>;
  }

  if (!stats) return null; // Wait for data to populate

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Dashboard</h1>
      </div>
      
      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard title="New Tickets" value={stats.newTickets.value} change={stats.newTickets.change} />
        <StatsCard title="Closed Today" value={stats.closedToday.value} change={stats.closedToday.change} />
        <StatsCard title="New Replies" value={stats.newReplies.value} change={stats.newReplies.change} />
        <StatsCard title="Followers" value={stats.followers.value} change={stats.followers.change} />
        <StatsCard title="Daily earnings" value={stats.dailyEarnings.value} change={stats.dailyEarnings.change} />
        <StatsCard title="Products" value={stats.products.value} change={stats.products.change} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Left Column */}
        <div className="flex flex-col space-y-6">
          <ActivityTable 
            activityData={activityData} 
            users={users} 
            onRemoveUser={handleRemoveUser} 
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-6">
          <DocsAlert />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ChartCard title="Chart title" data={donutData} type="donut" />
            <ChartCard title="Chart title" data={pieData} type="pie" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Empty placeholder cards at the bottom matching Tabler mock */}
             <div className="bg-white rounded border border-gray-200 shadow-sm p-4 h-32 flex items-center justify-center">
                 <span className="text-gray-500 text-sm font-medium">New feedback</span>
             </div>
             <div className="bg-white rounded border border-gray-200 shadow-sm p-4 h-32 flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-medium">Today profit</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
