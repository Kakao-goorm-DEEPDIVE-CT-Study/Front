import React, { useState } from "react";
import "../styles/SearchAccountsPage.css"; // 스타일 파일 경로 확인

const SearchAccountsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [accounts] = useState([
    { id: 1, name: "홍길동", tag: "#1234", avatar: "avatar1.png", isFollowing: false },
    { id: 2, name: "김길동", tag: "#5678", avatar: "avatar2.png", isFollowing: false },
    { id: 3, name: "이순신", tag: "#4321", avatar: "avatar3.png", isFollowing: false },
    { id: 4, name: "강감찬", tag: "#8765", avatar: "avatar4.png", isFollowing: false },
  ]);
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = accounts.filter((account) =>
      account.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAccounts(filtered);
  };

  const toggleFollow = (id) => {
    setFilteredAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id
          ? { ...account, isFollowing: !account.isFollowing }
          : account
      )
    );
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <input
          type="text"
          placeholder="계정 이름을 검색하세요"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </header>
      <section className="follow-list">
        <ul>
          {filteredAccounts.map((account) => (
            <li key={account.id} className="follow-item">
              <div className="profile">
                <img
                  src={account.avatar}
                  alt={`${account.name} 프로필`}
                  className="profile-image"
                />
                <div className="profile-info">
                  <span className="account-name">{account.name}</span>
                  <span className="account-tag">{account.tag}</span>
                </div>
              </div>
              <button
                className={`action-button ${
                  account.isFollowing ? "following" : ""
                }`}
                onClick={() => toggleFollow(account.id)}
              >
                {account.isFollowing ? "언팔로우" : "팔로우"}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SearchAccountsPage;
