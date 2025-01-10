import React, { useState } from 'react';
import styled from 'styled-components';
import TaskDetail from '../components/TaskDetail';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const TaskList = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  overflow-y: auto;
  max-height: 100vh;
  border-right: 1px solid #ddd;
`;

const getCategoryColor = (category) => {
  switch (category) {
    case '운동':
      return '#FFD700';
    case '공부':
      return '#98FB98';
    case '업무':
      return '#87CEEB';
    case '취미':
      return '#DDA0DD';
    case '약속':
      return '#FFA07A';
    default:
      return '#e0e0e0';
  }
};

const TaskItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.selected ? getCategoryColor(props.category) : 'white'};
  border-left: 4px solid ${props => getCategoryColor(props.category)};
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${props => {
      const color = getCategoryColor(props.category);
      return props.selected ? color : `${color}40`; // 40는 25% 투명도를 의미
    }};
  }
  
  ${props => props.selected && `
    color: ${props.category === '운동' ? 'black' : 'white'};
  `}
`;

const DetailContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
`;

const MainPage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: '운동 루틴',
      category: '운동',
      time: 'PM 10:00 - PM 11:00',
      isPublic: true,
      content: '1. 케이블 앞풀다운\n2. 렛풀다운\n3. 원암 덤벨 로우\n4. 시티드 케이블로우',
      comments: [
        {
          author: 'hyun5940',
          profileImage: 'https://via.placeholder.com/40',
          content: '오늘 운동 수고하셨습니다',
          isAuthor: true
        }
      ]
    },
    {
      id: 2,
      title: '알고리즘 공부',
      category: '공부',
      time: 'AM 6:00 - AM 7:00',
      isPublic: true,
      content: '1. 그리디 알고리즘 개념 정리\n2. 백준 문제 풀이\n3. 코드 리뷰',
      comments: []
    },
    {
      id: 3,
      title: '프로젝트 회의',
      category: '공부',
      time: 'PM 2:00 - PM 3:00',
      isPublic: false,
      content: '1. 프로젝트 진행상황 공유\n2. 이슈 논의\n3. 다음 주 계획 수립',
      comments: []
    },
    {
      id: 4,
      title: '기타 연습',
      category: '취미',
      time: 'PM 7:00 - PM 8:00',
      isPublic: true,
      content: '1. 기본 코드 연습\n2. 새로운 곡 배우기\n3. 녹음하기',
      comments: []
    },
    {
      id: 5,
      title: '친구 만나기',
      category: '약속',
      time: 'PM 6:00 - PM 7:00',
      isPublic: true,
      content: '1. 강남역에서 만나기\n2. 저녁 식사\n3. 카페에서 담소',
      comments: []
    }
  ]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setSelectedTask(updatedTask);
  };

  return (
    <PageContainer>
      <TaskList>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            selected={selectedTask?.id === task.id}
            category={task.category}
            onClick={() => handleTaskClick(task)}
          >
            {task.title}
          </TaskItem>
        ))}
      </TaskList>
      <DetailContainer>
        {selectedTask && (
          <TaskDetail 
            task={selectedTask} 
            onUpdate={handleTaskUpdate}
          />
        )}
      </DetailContainer>
    </PageContainer>
  );
};

export default MainPage;
