import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const RightSide = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState([]);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${import.meta.env.VITE_API_FOR_TRENDING}`
        );
        const data = await response.json();
        if (data.articles) {
          const topics = data.articles.map((article) => ({
            topic: article.title,
            source: article.source.name,
          }));
          setTrendingTopics(topics);
          setFilteredTopics(topics); // Initialize filtered topics with all topics
        }
      } catch (error) {
        console.error("Error fetching trending topics:", error);
      }
    };

    fetchTrendingTopics();
  }, []);

  // Handle search input and filter topics
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = trendingTopics.filter(
      (trend) =>
        trend.topic.toLowerCase().includes(query) ||
        trend.source.toLowerCase().includes(query)
    );
    setFilteredTopics(filtered);
  };

  return (
    <aside className="w-[22%] bg-white shadow-md fixed p-6 rounded-lg right-0 top-0 h-screen flex flex-col">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 p-3 rounded-full shadow-sm">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search trends..."
          value={searchQuery}
          onChange={handleSearch}
          className="ml-2 w-full bg-transparent outline-none text-gray-700"
        />
      </div>

      {/* Trending Section */}
      <h4 className="font-bold mt-6 text-gray-800">Trending for You</h4>
      <div className="mt-3 overflow-y-auto flex-1">
        <div className="space-y-3">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((trend, index) => (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded-lg shadow-md transition hover:bg-gray-200"
              >
                <h4 className="font-semibold text-gray-800">{trend.topic}</h4>
                <p className="text-sky-500">Source: {trend.source}</p>
              </div>
            ))
          ) : searchQuery ? (
            <p className="text-gray-500">No matching trends found</p>
          ) : (
            <p className="text-gray-500">Loading trending topics...</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default RightSide;