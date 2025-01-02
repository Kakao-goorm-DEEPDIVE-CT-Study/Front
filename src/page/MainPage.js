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
`;

const TaskItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  ${props => props.selected && `
    background-color: #007bff;
    color: white;
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
  
  // 임시 데이터
  const tasks = [
    {
      id: 1,
      title: '운동 카테고리 명',
      category: '운동',
      time: 'PM 10:00 - PM 11:00',
      isPublic: true,
      content: `1. 케이블 앞풀다운
2. 렛풀다운
3. 원암 덤벨 로우
4. 시티드 케이블로우`,
      comments: [
        {
          author: 'hyun5940',
          profileImage: 'https://via.placeholder.com/40',
          content: '오늘 운동 수고하셨습니다',
          isAuthor: true
        }
      ]
    },
    // 더 많은 테스크 추가 가능
  ];

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <PageContainer>
      <TaskList>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            selected={selectedTask?.id === task.id}
            onClick={() => handleTaskClick(task)}
          >
            {task.title}
          </TaskItem>
        ))}
      </TaskList>
      <DetailContainer>
        {selectedTask && <TaskDetail task={selectedTask} />}
      </DetailContainer>
    </PageContainer>
  );
};

export default MainPage;
