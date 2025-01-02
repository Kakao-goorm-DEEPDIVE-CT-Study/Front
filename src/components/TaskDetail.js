import React from 'react';
import styled from 'styled-components';

const TaskDetailContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  height: 100%;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TaskTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const CategoryBadge = styled.span`
  background-color: #FFD700;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.delete ? '#ff4d4d' : '#f0f0f0'};
  color: ${props => props.delete ? 'white' : 'black'};
`;

const TaskInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
`;

const TimeInfo = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const VisibilityBadge = styled.span`
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const TaskContent = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const CommentSection = styled.div`
  margin-top: 20px;
`;

const CommentInput = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CommentButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 4px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 10px;
`;

const TaskDetail = ({ task }) => {
  return (
    <TaskDetailContainer>
      <TaskHeader>
        <TaskTitle>{task?.title}</TaskTitle>
        <CategoryBadge>{task?.category}</CategoryBadge>
      </TaskHeader>
      
      <TaskActions>
        <ActionButton>수정</ActionButton>
        <ActionButton delete>삭제</ActionButton>
      </TaskActions>

      <TaskInfo>
        <TimeInfo>{task?.time}</TimeInfo>
        <VisibilityBadge>{task?.isPublic ? '공개' : '비공개'}</VisibilityBadge>
      </TaskInfo>

      <TaskContent>
        {task?.content}
      </TaskContent>

      <CommentSection>
        <CommentInput>
          <ProfileImage src="https://via.placeholder.com/40" alt="my profile" />
          <Input placeholder="댓글을 입력하세요..." />
          <CommentButton>등록</CommentButton>
        </CommentInput>

        <CommentList>
          {task?.comments?.map((comment, index) => (
            <CommentItem key={index}>
              <ProfileImage src={comment.profileImage} alt="profile" />
              <CommentContent>
                <CommentHeader>
                  <span>{comment.author}</span>
                  {comment.isAuthor && (
                    <CommentActions>
                      <ActionButton>수정</ActionButton>
                      <ActionButton delete>삭제</ActionButton>
                    </CommentActions>
                  )}
                </CommentHeader>
                <p>{comment.content}</p>
              </CommentContent>
            </CommentItem>
          ))}
        </CommentList>
      </CommentSection>
    </TaskDetailContainer>
  );
};

export default TaskDetail;
