import React, { useState, useEffect } from "react";
import "../styles/FollowersPage.css";

const FollowersPage = () => {
  const [followers, setFollowers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const mockFollowers = [
      { id: 1, name: "홍길동", tag: "#1120", isFollowing: true, profileImage: "https://via.placeholder.com/40" },
      { id: 2, name: "김길동", tag: "#0548", isFollowing: true, profileImage: "https://via.placeholder.com/40" },
      { id: 3, name: "이순신", tag: "#1874", isFollowing: false, profileImage: "https://via.placeholder.com/40" },
      { id: 4, name: "문익점", tag: "#2A47", isFollowing: false, profileImage: "https://via.placeholder.com/40" },
      { id: 5, name: "강감찬", tag: "#18D2", isFollowing: false, profileImage: "https://via.placeholder.com/40" },
      { id: 6, name: "최철철", tag: "#8973", isFollowing: false, profileImage: "https://via.placeholder.com/40" },
      { id: 7, name: "이재용", tag: "#0505", isFollowing: false, profileImage: "https://via.placeholder.com/40" },
      { id: 8, name: "테슬라오너", tag: "#6644", isFollowing: false, profileImage: "https://via.placeholder.com/40" },
    ];
    setFollowers(mockFollowers);
  }, []);

  const filteredFollowers = followers.filter((follower) =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFollowers = filteredFollowers.slice(startIndex, startIndex + itemsPerPage);

  const handleFollowToggle = (id) => {
    setFollowers((prev) =>
      prev.map((follower) =>
        follower.id === id
          ? { ...follower, isFollowing: !follower.isFollowing }
          : follower
      )
    );
  };

  const totalPages = Math.ceil(filteredFollowers.length / itemsPerPage);

  return (
    <div className="followers-page">
      <h2>팔로워</h2>
      <input
        type="text"
        placeholder="팔로워 계정 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul className="followers-list">
        {paginatedFollowers.map((follower) => (
          <li key={follower.id} className="followers-list-item">
            <div className="profile">
              <img src={follower.profileImage} alt={`${follower.name}의 프로필`} className="profile-image" />
              <div className="profile-info">
                <span className="profile-name">{follower.name}</span>
                <span className="profile-tag">{follower.tag}</span>
              </div>
            </div>
            <button
              onClick={() => handleFollowToggle(follower.id)}
              className={`follow-button ${follower.isFollowing ? "following" : "not-following"}`}
            >
              {follower.isFollowing ? "맞팔중" : "맞팔하기"}
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;
