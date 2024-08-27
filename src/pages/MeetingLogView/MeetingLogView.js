import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MeetingLogView = () => {
  const { date } = useParams(); // URL에서 날짜를 가져옵니다.
  const [meetingLog, setMeetingLog] = useState(null);

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

    fetchMeetingLog();
  }, [date]);

  if (!meetingLog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{meetingLog.title}</h2>
      <p><strong>회의 날짜:</strong> {meetingLog.date}</p>
      <p><strong>회의 참여자:</strong> {meetingLog.participants.join(", ")}</p>
      <div>
        <strong>녹음본:</strong>
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
  );
};

export default MeetingLogView;
