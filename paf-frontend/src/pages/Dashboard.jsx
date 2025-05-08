import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProgress } from '../services/api';

const Dashboard = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProgress();
        setProgressData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load progress data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = {
    total: progressData.length,
    completed: progressData.filter(item => item.status === 'Completed').length,
    inProgress: progressData.filter(item => item.status === 'In Progress').length,
    projects: progressData.filter(item => item.template === 'Completed Project/Task').length,
    challenges: progressData.filter(item => item.template === 'Challenges/Competitions').length,
    workshops: progressData.filter(item => item.template === 'Workshops/Bootcamps').length,
  };

  const recentActivities = [...progressData]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="px-6 py-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[300px] text-gray-500">
        <div className="w-10 h-10 border-3 border-blue-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p>Loading your progress data...</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 max-w-7xl mx-auto relative">
      <h1 className="text-3xl font-bold mb-8 text-[#0a9bdf] pl-4 relative">
        <span className="absolute left-0 top-2.5 h-2/3 w-1.5 bg-[#0a9bdf] rounded"></span>
        Learning Progress Dashboard
      </h1>

      {error && (
        <div className="p-4 rounded mb-6 bg-red-100 text-red-800 border-l-4 border-red-500 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
            ×
          </button>
        </div>
      )}

      <div className="mb-8">
        <div className="bg-white rounded-lg shadow hover:shadow-md transform hover:-translate-y-0.5 transition-all">
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#0a9bdf]">Board of Status</h2>
          </div>

          {/* First Row: Completed, In Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 p-6">
            <StatBox color="green" value={stats.completed} label="Completed" />
            <StatBox color="blue" value={stats.inProgress} label="In Progress" />
          </div>

          {/* Second Row: Projects, Challenges, Workshops */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 pt-0">
            <StatBox color="indigo" value={stats.projects} label="Projects" />
            <StatBox color="purple" value={stats.challenges} label="Challenges" />
            <StatBox color="yellow" value={stats.workshops} label="Workshops" />
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg shadow hover:shadow-md transform hover:-translate-y-0.5 transition-all">
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#0a9bdf]">Recent Activities</h2>
            <Link to="/achievements" className="py-2 px-4 text-sm font-medium rounded border border-blue-500 text-[#0a9bdf] hover:bg-[#0a9bdf] hover:text-white transition-all">
              View All
            </Link>
          </div>

          {recentActivities.length === 0 ? (
            <p className="p-6">No activities found. Start by adding your progress!</p>
          ) : (
            <div className="px-6">
              {recentActivities.map(activity => (
                <div key={activity.id} className="py-5 px-4 border-b border-gray-200 transition-all hover:bg-blue-50">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-[#0a9bdf]">{activity.topic}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'In Progress' ? 'bg-blue-100 text-[#0a9bdf]' :
                      activity.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2 line-clamp-2">{activity.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{activity.template}</span>
                    <span>{new Date(activity.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating "+" Button */}
      <Link
        to="/add"
        className="group fixed bottom-6 right-6 w-14 h-14 bg-[#0a9bdf] text-white text-3xl rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all z-50"
        title="Add New Progress"
      >
        <span className="text-2xl leading-none">+</span>
        <span className="absolute bottom-16 right-0 scale-0 group-hover:scale-100 transition-transform origin-bottom-right bg-black text-white text-xs px-2 py-1 rounded shadow-lg">
          Add New Progress
        </span>
      </Link>
    </div>
  );
};

// Reusable StatBox component
const StatBox = ({ color, value, label }) => {
  const colorMap = {
    green: 'bg-green-50 border-green-200 text-green-700 from-green-500 to-green-300',
    blue: 'bg-blue-50 border-blue-200 text-blue-700 from-blue-500 to-blue-300',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700 from-indigo-500 to-indigo-300',
    teal: 'bg-teal-50 border-teal-200 text-teal-700 from-teal-500 to-teal-300',
    purple: 'bg-purple-50 border-purple-200 text-purple-700 from-purple-500 to-purple-300',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700 from-yellow-500 to-yellow-300',
  };

  const classes = colorMap[color];

  return (
    <div className={`rounded p-6 text-center shadow-sm hover:shadow hover:-translate-y-1 transition-all border ${classes.split(' ').slice(1,2)} relative overflow-hidden ${classes.split(' ')[0]}`}>
      <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${classes.split(' ').slice(3).join(' ')}`}></div>
      <h3 className={`text-4xl font-bold mb-2 ${classes.split(' ')[2]}`}>{value}</h3>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
    </div>
  );
};

export default Dashboard;
