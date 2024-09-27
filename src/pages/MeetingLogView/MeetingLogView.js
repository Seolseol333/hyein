import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoMenu, IoAddCircle, IoPerson, IoBookmark } from "react-icons/io5";
import './MeetingLogView.css';

function ParticipantSelector({participants = [], onSave}) {
  return (
    <div>
      <select>
        {participants.map((participant, index) => (
          <option key={index} value={participant}>
            {participant}
          </option>
        ))}
      </select>
    </div>
  );
};

function MeetingLogView() {
  const { date } = useParams(); // URL에서 날짜를 가져옵니다.
  const [meetingLog, setMeetingLog] = useState({
    title: "회의 제목 오는 자리",  // 초기값 설정
    date: "오늘",                  // 초기값 설정
    participants: [],               // 초기값 설정
    recordings: [],                 // 초기값 설정
    content: "회의 내용",   
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [recordedFiles, setRecordedFiles] = useState([]);
  const [file, setFile] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
};

  const handleEndButtonClick = () => {
    console.log('작성 완료');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    const updatedMeetingLog = {
      title: meettingLog.title,
      date: meetingLog.date,
      participants: meetingLog.participants,
      recordings:recordedFiles,
      content: meetingLog.content,
    };

    fetch('/api/meetinglog', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(updatedMeetingLog),
    })
      .then(response => response.json())
      .then(data => {
        console.log("저장 완료:", data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error("저장 중 에러 발생:", error);
      });  
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setIsDeleted(true);
  };


  useEffect(() => {
    console.log("useEffect 실행됨");
    // 해당 날짜의 회의록 데이터를 가져오는 함수
    
  }, [date]);

  if (isDeleted) {
    return <div>회의록이 삭제되었습니다.</div>
  }

  

  return (
    <div>
      <header className="header">
          <div className="my-page-logout">
          <IoPerson size={24} />
          <a href="/mypage">마이페이지</a> | <a href="/logout">로그아웃</a>
          </div>
      </header>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
          <IoMenu size={24} />
      </button>
      <aside className={`App-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
              <p>aa</p>
          </div>
      </aside>
      <div className="container">
        <div editable-post>
          {isEditing ? (
            <div className="edit">
              <h1>{meetingLog.title}</h1>
              <div className="participants-group">
                <h4>참여자</h4>
                <ParticipantSelector
                  participants={meetingLog.participants}
                  onSave={handleSave}
                />
              </div>
              <p>직접 입력</p>
              <div>여기에 실시간 수정 api 받아오기</div>
              <div>
                {recordedFiles.map((file, index) => (
                  <div key={index}>{file}</div>
                ))}
              </div>
              <button className="end-button" onClick={handleSave}>저장</button>
            </div>
          ) : (
            <div className = "view-meetinglog">
              <h2>{meetingLog.title}</h2>
              <p><strong>회의 날짜:</strong> {meetingLog.date}</p>
              <p><strong>회의 참여자:</strong> {meetingLog.participants.join(", ")}</p>
              <strong>회의 녹음 내용:</strong>
              <div>
                <ul>
                  {meetingLog.recordings.map((recording, index) => (
                    <li key={index}>
                      <a href={recording.url} download>{recording.filename}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>회의 내용:</strong>
                <p>{meetingLog.content}</p>
              </div>
              <button onClick={() => setIsEditing(true)}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            
            </div>

          )}
            
        </div>
      </div>
    </div>
  );
};

export default MeetingLogView;
