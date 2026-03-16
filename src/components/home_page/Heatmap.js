import React, { useEffect, useState } from 'react';
import GitHubHeatmap from './GitHubHeatmap';

// const fetchCommits = async (username, token) => {
//   const url = `https://api.github.com/users/${username}/events?per_page=100`;
//   const headers = {
//     Authorization: `token ${token}`,
//   };
//   try {
//     const response = await axios.get(url, { headers });
//     console.log(response.data)
//     return response.data.filter(event => event.type === 'PushEvent');
//   } catch (error) {
//     console.error('Error fetching GitHub data:', error);
//     return [];
//   }
// };

const prepareHeatmapData = (events) => {
    const contributionsMap = {};
  
    // Accumulate the number of events per date
    events.forEach(event => {
      const date = new Date(event.created_at).toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
      contributionsMap[date] = (contributionsMap[date] || 0) + 1;
    });
  
    // Convert the accumulated data into an array of { date, value } objects
    const contributions = Object.entries(contributionsMap).map(([date, value]) => ({
      date,
      value
    }));
  
    return contributions;
  };  

const MyGitHubHeatmap = () => {
  const [evData, setData] = useState({});

  useEffect(() => {
    const fetchEventsData = async () => {
        try {
          const response = await fetch('/data/git_events.json'); // URL relative to the public directory
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const events = await response.json();            
          const heatmapData = prepareHeatmapData(events);
          setData(heatmapData);
        } catch (error) {
          console.error("Error fetching events data:", error);
        }
      };
      fetchEventsData();
  }, []);

  return (
    <div>
      <h1>GitHub Contributions</h1>
      <GitHubHeatmap evData={evData} />
    </div>
  );
};

export default MyGitHubHeatmap;
