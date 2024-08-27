import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { IoMenu, IoPerson,IoMicSharp, IoRecordingOutline  } from "react-icons/io5";


function MeetingLog() {
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const RecordingComponent = () => {
      const [isRecording, setIsRecording] = useState(false);
      const [recordedFiles, setRecordedFiles] = useState([]);
      const [recordingText, setRecordingText] = useState('');
      const [userInput, setUserInput] = useState('');
      const [meetingLog, setMeetingLog] = useState("");
      const navigate = useNavigate();

      const handleRecordButtonClick = async () => {
        
        if (!isRecording) {
          /*녹음 시작*/
          setIsRecording(true);
          /*녹음 시작 api 호출*/
        } else {
          setIsRecording(false);
          /*녹음 종료 api 호출 후 녹음본 텍스트 변환*/
          const transcription = await fetch('api써야함');
          setRecordingText(transcription);
          /*녹음본을 저장할 것인지 묻는 팝업*/
          if (window.confirm('녹음 파일을 저장하시겠습니까?')) {
            /*파일 저장 api 호출*/
            fetch('api 써야함', {method: 'POST'});
          }
        }
      };

      const handleEndButtonClick =  () => {
        fetch('notyet', {
          method: 'POST',
          body: JSON.stringify({
            recordingText,
            userInput,
          }),
        });
        
        window.location.href = '/schedule';
      };

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
            {/*녹음 버튼 누르면 녹음 기능 켜짐
            녹음 버튼 눌렀을 때 아이콘 변화, 녹음 버튼 끄면 녹음 저장
            녹음을 여러번 할 수도 있으니까 여러번 누적 저장도 고려해야힘
            회의록 작성 완료 누를 때 녹음본을 저장하시겠습니까? 팝업창 띄워줌
            회의록 내용 작성할 칸 (아래 요약본 파트 따로 나누는 건 api 쪽 css 수정이 필요해보임 - 기본 템플릿처럼 제공하는 기능)
            내용 작성 시 회의 제목, 참여자, (날짜는 달력에서 클릭했던 날짜로), 사진 첨부 등이 가능하게?, 요약본에는 그 글 앞에 점 찍혀있는 그거 만들어주기
            작성 완료 버튼
            내용 작성 부분은 백 쪽 api 불러올 걸 고려해서 코드 작성*/}
        <div>
          <button className="record-button" onClick={handleRecordButtonClick}>
            {isRecording ? (
              <IoRecordingOutline size={24} />
            ) : (
              <IoMicSharp size={24} />
            )}
            {isRecording ? "녹음 중" : "녹음하기"}
          </button>
          <div>
            <p>녹음본 텍스트</p>
            {/*녹음본 텍스트랑 이용자가 직접 회의내용 입력하는 부분을 가로 배치하는 걸로 생각하고 있는데 어떻게 생각하는지? 
            - 아니면 기록할 때는 이 부분은 안보이고 이후에 기록한 걸 확인하는 창에서는 가로 배치로 보이게끔?*/}
            <textarea value={recordingText} readOnly />
          </div>
          <div>
            <h1>회의 제목</h1>
            <p>직접 입력</p>
            <div>여기에 실시간 수정 api 받아오기</div>
          </div>
          <div>
            {recordedFiles.map((file, index) => (
              <div key={index}>{file}</div>
            ))}
          </div>
          <button className="end-button" onClick={handleEndButtonClick}>작성 완료</button>
        </div>

        </div>
        /*참여자 목록 작성하는거 이름 버튼 클릭하는 식? 노션과 같은 방식을 뭐라고 하지?*/
        
      );
    };

    return (
      <div>
        <RecordingComponent />
      </div>
    );

  }

export default MeetingLog;



