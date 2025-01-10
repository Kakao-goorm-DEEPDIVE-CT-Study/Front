import React, { useState, useEffect } from 'react';
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
  white-space: pre-line;
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

const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  white-space: pre-line;
`;

const EditTimeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const TimeSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

const VisibilityToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  label {
    cursor: pointer;
  }

  input[type="checkbox"] {
    cursor: pointer;
  }
`;

const TaskDetail = ({ task, onUpdate }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(task?.comments || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task?.title);
  const [editedContent, setEditedContent] = useState(task?.content);
  const [editedTime, setEditedTime] = useState(task?.time || 'PM 10:00 - PM 11:00');
  const [editedIsPublic, setEditedIsPublic] = useState(task?.isPublic);

  useEffect(() => {
    setComments(task?.comments || []);
    setEditedTitle(task?.title);
    setEditedContent(task?.content);
    setEditedTime(task?.time || 'PM 10:00 - PM 11:00');
    setEditedIsPublic(task?.isPublic);
  }, [task]);

  const timeOptions = [
    'AM 12:00 - AM 1:00', 'AM 1:00 - AM 2:00', 'AM 2:00 - AM 3:00',
    'AM 3:00 - AM 4:00', 'AM 4:00 - AM 5:00', 'AM 5:00 - AM 6:00',
    'AM 6:00 - AM 7:00', 'AM 7:00 - AM 8:00', 'AM 8:00 - AM 9:00',
    'AM 9:00 - AM 10:00', 'AM 10:00 - AM 11:00', 'AM 11:00 - PM 12:00',
    'PM 12:00 - PM 1:00', 'PM 1:00 - PM 2:00', 'PM 2:00 - PM 3:00',
    'PM 3:00 - PM 4:00', 'PM 4:00 - PM 5:00', 'PM 5:00 - PM 6:00',
    'PM 6:00 - PM 7:00', 'PM 7:00 - PM 8:00', 'PM 8:00 - PM 9:00',
    'PM 9:00 - PM 10:00', 'PM 10:00 - PM 11:00', 'PM 11:00 - AM 12:00'
  ];

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      author: 'hyun5940',
      profileImage: 'https://via.placeholder.com/40',
      content: newComment,
      isAuthor: true
    };

    const updatedComments = [newCommentObj, ...comments];
    setComments(updatedComments);
    onUpdate({
      ...task,
      comments: updatedComments
    });
    setNewComment('');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      content: editedContent,
      time: editedTime,
      isPublic: editedIsPublic
    };
    onUpdate(updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task?.title);
    setEditedContent(task?.content);
    setEditedTime(task?.time);
    setEditedIsPublic(task?.isPublic);
    setIsEditing(false);
  };

  return (
    <TaskDetailContainer>
      <TaskHeader>
        {isEditing ? (
          <EditInput
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        ) : (
          <TaskTitle>{task?.title}</TaskTitle>
        )}
        <CategoryBadge>{task?.category}</CategoryBadge>
      </TaskHeader>
      
      <TaskActions>
        {isEditing ? (
          <>
            <ActionButton onClick={handleSave}>저장</ActionButton>
            <ActionButton onClick={handleCancel}>취소</ActionButton>
          </>
        ) : (
          <>
            <ActionButton onClick={handleEdit}>수정</ActionButton>
            <ActionButton delete>삭제</ActionButton>
          </>
        )}
      </TaskActions>

      <TaskInfo>
        {isEditing ? (
          <>
            <EditTimeContainer>
              <TimeSelect
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </TimeSelect>
            </EditTimeContainer>
            <VisibilityToggle>
              <input
                type="checkbox"
                id="visibility"
                checked={editedIsPublic}
                onChange={(e) => setEditedIsPublic(e.target.checked)}
              />
              <label htmlFor="visibility">공개</label>
            </VisibilityToggle>
          </>
        ) : (
          <>
            <TimeInfo>{task?.time}</TimeInfo>
            <VisibilityBadge>{task?.isPublic ? '공개' : '비공개'}</VisibilityBadge>
          </>
        )}
      </TaskInfo>

      <TaskContent>
        {isEditing ? (
          <EditTextarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        ) : (
          task?.content
        )}
      </TaskContent>

      <CommentSection>
        <CommentInput>
          <ProfileImage src="https://via.placeholder.com/40" alt="my profile" />
          <Input 
            placeholder="댓글을 입력하세요..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCommentSubmit();
              }
            }}
          />
          <CommentButton onClick={handleCommentSubmit}>등록</CommentButton>
        </CommentInput>

        <CommentList>
          {comments.map((comment, index) => (
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
