import { useState } from "react";
import {
  Search,
  Clock,
  Settings,
  X,
  Newspaper,
  Rows2,
  CirclePlus,
} from "lucide-react";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([
    "Past search 1",
    "Past search 2",
    "More find information...",
    "Database Administrator",
    "Computer security",
    "Computer Systems Analyst",
  ]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const templates = [
    { label: "Software Engineer" },
    { label: "Computer hardware engineer" },
    { label: "Network Engineer" },
    { label: "Technical Support" },
    { label: "Network administrator" },
    { label: "Management" },
    { label: "Data analysis" },
    { label: "Computer technician" },
  ];

  const boards = ["Board 1", "Board 2", "Board 3"];

  const boardsLock = ["Board agent 1", "Board agent 1", "Board agent 1"];

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      if (!searchHistory.includes(searchQuery.trim())) {
        setSearchHistory([searchQuery.trim(), ...searchHistory]);
      }
      setSearchQuery("");
      setIsSearchFocused(false);
    }
  };

  const handleSearchClick = (historyItem) => {
    setSearchQuery(historyItem);
  };

  const removeFromHistory = (index, e) => {
    e.stopPropagation();
    setSearchHistory(searchHistory.filter((_, i) => i !== index));
  };

  const filteredTemplates = templates.filter((template) =>
    template.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHistory = searchHistory.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-60 h-screen fixed bg-white border-r border-gray-200 flex flex-col text-xs">
      <div className="px-3 py-3 border-b border-gray-200">
        <img src="/img/logo.png" className="h-[24px]" alt="" />
      </div>
      <div className="flex-1 overflow-y-auto me-1 mt-1 mb-1">
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2 py-1.5 text-gray-800">
            <Newspaper width={16} height={16} />
            <span className="font-medium text-xs">My templates</span>
          </div>
        </div>
        <div className="px-3">
          <div className="relative">
            <div className="flex items-center gap-2 py-1.5 text-gray-700 px-2 -mx-2">
              <Search className="w-[16px] text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="flex-1 outline-none bg-transparent placeholder-gray-700"
              />
            </div>
          </div>
        </div>

        {searchQuery === "" && (
          <div className="px-3">
            {templates.map((template, index) => (
              <div
                key={index}
                className="flex items-center gap-2 py-1.5 text-gray-700 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2"
              >
                <img src="/img/star.png" className="w-[16px]" alt="" />
                <span>{template.label}</span>
              </div>
            ))}
          </div>
        )}

        {searchQuery !== "" && filteredTemplates.length > 0 && (
          <div className="px-3">
            <div className="text-gray-500 font-medium py-1 px-2 text-xs">
              Templates
            </div>
            {filteredTemplates.map((template, index) => (
              <div
                key={index}
                className="flex items-center gap-2 py-1.5 text-gray-700 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2"
              >
                <span className="text-sm">{template.icon}</span>
                <span>{template.label}</span>
              </div>
            ))}
          </div>
        )}

        {searchQuery === "" ? (
          <div className="px-3 mt-1">
            {searchHistory.map((search, index) => (
              <div
                key={index}
                className="flex items-center gap-2 py-1.5 text-gray-700 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2 group"
              >
                <Clock className="w-4 text-gray-500 flex-shrink-0" />
                <span
                  className="truncate flex-1"
                  onClick={() => handleSearchClick(search)}
                >
                  {search}
                </span>
                <X
                  className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 flex-shrink-0"
                  onClick={(e) => removeFromHistory(index, e)}
                />
              </div>
            ))}
          </div>
        ) : (
          filteredHistory.length > 0 && (
            <div className="px-3 mt-2">
              <div className="text-gray-500 font-medium py-1 px-2 text-xs">
                Recent Searches
              </div>
              {filteredHistory.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 py-1.5 text-gray-700 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2 group"
                >
                  <Clock className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                  <span
                    className="truncate flex-1"
                    onClick={() => handleSearchClick(search)}
                  >
                    {search}
                  </span>
                  <X
                    className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 flex-shrink-0"
                    onClick={(e) =>
                      removeFromHistory(searchHistory.indexOf(search), e)
                    }
                  />
                </div>
              ))}
            </div>
          )
        )}

        {searchQuery !== "" &&
          filteredTemplates.length === 0 &&
          filteredHistory.length === 0 && (
            <div className="px-5 py-4 text-gray-500 text-center">
              No results found for "{searchQuery}"
            </div>
          )}

        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2 text-gray-800">
              <Rows2 width={16} height={16} />
              <span className="font-medium text-xs">My boards</span>
            </div>
            <CirclePlus className="w-3.5 h-3.5 text-gray-500 cursor-pointer hover:text-gray-700" />
          </div>
        </div>

        <div className="px-3">
          {boards.map((board, index) => (
            <div
              key={index}
              className="flex items-center gap-2 py-1.5 text-gray-700 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2"
            >
              <img src="/img/board.png" className="w-[16px]" alt="" />
              <span>{board}</span>
            </div>
          ))}
        </div>
        <div className="px-3 pb-4">
          {boardsLock.map((board, index) => (
            <div
              key={index}
              className="flex items-center gap-2 py-1.5 text-gray-700 cursor-pointer hover:bg-gray-50 rounded px-2 -mx-2"
            >
              <img src="/img/lock.png" className="w-[16px]" alt="" />
              <span>{board}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 px-3 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/img/user1.png"
            className="w-[32px] h-[32px] rounded-full"
            alt=""
          />
          <span className="text-sm font-medium text-gray-900">Carla</span>
        </div>
        <Settings className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
      </div>
    </div>
  );
};

export default Sidebar;
