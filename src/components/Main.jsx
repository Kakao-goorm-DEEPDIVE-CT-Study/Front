import { useEffect, useState } from "react";
import Todoslist from "./Todoslist";
import Calendar from "./Calendar";

function Main() {
    // 카테고리 데이터: 이름과 색상을 포함
    const categories = {
        work: {
          name: "업무",
          color: "bg-blue-100",
        },
        meeting: {
          name: "미팅",
          color: "bg-yellow-100",
        },
        personal: {
          name: "개인",
          color: "bg-green-100",
        },
        urgent: {
          name: "긴급",
          color: "bg-red-100",
        },
    };

    // 현재 시간을 관리하는 상태
    const [currentTime, setCurrentTime] = useState(new Date());

    // 사용자 프로필 상태 추가
    const [user, setUser] = useState({
        name: '사용자',
        profileImage: 'https://via.placeholder.com/50' // 기본 프로필 이미지
    });

    // 히트맵 데이터 생성 함수
    const generateHeatmapData = () => {
        const months = 12; // 12개월
        return Array.from(
          {
            length: months,
          },
          () =>
            Array.from(
              {
                length: 7, // 7일(일주일)
              },
              () =>
                Object.keys(categories)[
                  Math.floor(Math.random() * Object.keys(categories).length)
                ],
            ),
        );
    };

    // 히트맵 데이터를 상태로 관리
    const [heatmapData] = useState(generateHeatmapData());

    // 매 1분마다 현재 시간을 갱신하는 타이머 설정
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="main contents">
            {/* 상단 헤더 추가 */}
            <header className="flex justify-between items-center p-3 bg-gray-100">
                <h1 className="text-2xl font-bold">OptiDay</h1>
                <div className="flex items-center">
                    {/* 사용자 프로필 이미지와 이름 표시 가능 */}
                    <img src={user.profileImage} alt="프로필 이미지" className="rounded-full w-12 h-12 mr-3" />
                    <span className="text-lg font-semibold">{user.name}</span>
                </div>
            </header>

            {/* 할 일 목록 컴포넌트 렌더링 */}
            <div className="p-3">
                <Todoslist />
            </div>

            {/* 캘린더 컴포넌트와 피드백 섹션 */}
            <div className="w-100 p-3">
                <Calendar />
                <div className="feedback p-3 rounded bg-gray-200 mt-4">피드백</div>
            </div>
        </div>
    );
}

export default Main;
