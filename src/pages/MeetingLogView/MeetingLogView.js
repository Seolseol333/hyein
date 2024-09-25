import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ParticipantSelector = ({participants, onSave}) => {
  return (
    <div>
      <select>
        {participants.map((participant, index) => (
          <option key={index} value={participant}>
            {participant}
          </option>
        ))}
      </select>
      <button onClick={onSave}>저장</button>
    </div>
  );
};

const MeetingLogView = () => {
  const { date } = useParams(); // URL에서 날짜를 가져옵니다.
  const [meetingLog, setMeetingLog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [recordedFiles, setRecoredeFiles] = useState([]);
  const [file, setFile] = useState(null);
  const handleEndButtonClick = () => {
    console.log('작성 완료');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setIsDeleted(true);
  };

  if (isDeleted) {
    return <div>Post has been deleted.</div>;
  };

  useEffect(() => {
    // 해당 날짜의 회의록 데이터를 가져오는 함수
    const fetchMeetingLog = async () => {
      try {
        const response = await fetch(`/api/meetingLog/${date}`);
        const data = await response.json();
        setMeetingLog(data);
      } catch (error) {
        console.error("Error fetching meeting log:", error);
      }
    };

    if(!meetingLog) {
      fetchMeetingLog();
    }
  }, [date, meetingLog]);

  if(isDeleted) {
    return <div>Post has been deleted.</div>;
  }

  if (!meetingLog) {
    return (<div>
      <h2>회의 제목 오는 자리</h2>
      <p><strong>회의 날짜 표시</strong></p>
      <p><strong>회의 참여자 표시</strong></p>
      <div>
        <strong>녹음본 텍스트 변환</strong>
      </div>
      <div><strong>회의 내용</strong>
      <p>내용 표시</p></div>
      <button>수정</button>
    </div>);
  };

  
  const saveParticipantsToDB = (participants) => {
    fetch("/api/saveParticipants", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({participants}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Participants saved:', data);
      })
      .catch((error) => {
        console.error('Error saving participants:', error);
      });
  };

  return (
    <div className="container">
      <div editable-post>
        {isEditing ? (
          <div className="edit">
            <h1>회의 제목</h1>
            <div className="participants">
              <h3>참여자</h3>
              <ParticipantSelector
                participants={meetingLog.participants}
                onSave={saveParticipantsToDB}
              />
              <p>직접 입력</p>
              <div>여기에 실시간 수정 api 받아오기</div>
              <div>
                {recordedFiles.map((file, index) => (
                  <div key={index}>{file}</div>
                ))}
              </div>
            </div>
            <button className="end-button" onClick={handleEndButtonClick}>작성 완료</button>
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
          </div>

        )}
          
      </div>
    </div>
    
  );
};

export default MeetingLogView;
