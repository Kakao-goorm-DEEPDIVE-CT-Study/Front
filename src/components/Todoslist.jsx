
// function Todoslist(){


//     const todos = [
//         {title:'운동',startdate:'10:00',enddate:'11:30'},
//         {title:'저녁 약속',startdate:'18:00',enddate:'20:00'},
//         {title:'운동',startdate:'10:00',enddate:'11:30'},
//     ]
//     return(
//     <div className="Todoslist rounded">
//         {todos.map( (todo)=>{
//             return(
//                 <div className="todoitem">
//                     <div>
//                         {todo.title}
//                     </div>
//                     <div>
//                         {todo.startdate} ~ {todo.enddate}
//                     </div>
//                 </div>
//             );
//         })}
//     </div>
//     )
// }
// export default Todoslist
import { useState } from 'react';

function Todoslist() {
  // 할 일 목록 데이터
  const todos = [
    { title: '운동', startdate: '10:00', enddate: '11:30', category: 'Work' },
    { title: '저녁 약속', startdate: '18:00', enddate: '20:00', category: 'Personal' },
    { title: '회의', startdate: '13:00', enddate: '14:00', category: 'Work' },
    { title: '운동', startdate: '10:00', enddate: '11:30', category: 'Personal' },
  ];

  // 선택된 카테고리를 관리하는 상태
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 카테고리별로 할 일 목록을 그룹화
  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.category]) {
      acc[todo.category] = [];
    }
    acc[todo.category].push(todo);
    return acc;
  }, {});

  // 카테고리별 색상 지정
  const categoryColors = {
    Work: '#d1e7dd', // 연한 초록색
    Personal: '#f8d7da', // 연한 빨간색
  };

  return (
    <div className="Todoslist rounded">
      {/* 카테고리 선택 드롭다운을 리스트 위로 이동 */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <option value="All">카테고리 선택</option>
          {/* 모든 카테고리를 드롭다운 옵션으로 추가 */}
          {Object.keys(groupedTodos).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* 선택된 카테고리의 할 일 목록을 렌더링 */}
      {(selectedCategory === 'All' ? Object.keys(groupedTodos) : [selectedCategory]).map((category) => (
        <div key={category} className="category-group">
          {groupedTodos[category].map((todo, index) => {
            // 시작 시간 포맷 변환 (24시간 -> 12시간)
            const startTime = todo.startdate.split(':');
            const startHour = parseInt(startTime[0]);
            const startMinute = startTime[1];
            const startAmPm = startHour < 12 ? 'AM' : 'PM';
            const startHour12 = startHour % 12 === 0 ? 12 : startHour % 12;

            // 종료 시간 포맷 변환 (24시간 -> 12시간)
            const endTime = todo.enddate.split(':');
            const endHour = parseInt(endTime[0]);
            const endMinute = endTime[1];
            const endAmPm = endHour < 12 ? 'AM' : 'PM';
            const endHour12 = endHour % 12 === 0 ? 12 : endHour % 12;

            return (
              <div 
                className="todoitem" 
                key={index} 
                style={{ backgroundColor: categoryColors[todo.category] || '#ffffff', padding: '10px', margin: '5px 0', borderRadius: '5px' }}
              >
                {/* 할 일 제목 */}
                <div>{todo.title}</div>
                {/* 시작 시간과 종료 시간 */}
                <div>
                  {startAmPm} {startHour12}:{startMinute} ~ {endAmPm} {endHour12}:{endMinute}
                </div>
                {/* 카테고리 */}
                <div>{todo.category}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Todoslist;

