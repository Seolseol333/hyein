import React, { useState } from 'react';

// 참여자 선택 컴포넌트
const ParticipantSelector = ({ participants, onSave }) => {
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  // 드롭다운에서 참여자를 선택할 때 호출되는 함수
  const handleSelectParticipant = (event) => {
    const selectedName = event.target.value;

    // 이미 선택된 사람이 아니라면 추가
    if (!selectedParticipants.includes(selectedName)) {
      setSelectedParticipants([...selectedParticipants, selectedName]);
    }
  };

  // 선택된 참여자를 삭제하는 함수
  const handleRemoveParticipant = (nameToRemove) => {
    setSelectedParticipants(
      selectedParticipants.filter((name) => name !== nameToRemove)
    );
  };

  // DB에 저장하는 로직은 상위 컴포넌트에서 처리하도록 함수를 호출
  const handleSubmitToDB = () => {
    onSave(selectedParticipants); // 상위 컴포넌트에서 전달된 함수 호출
  };

  return (
    <div>
      <h3>참여자 선택</h3>
      <select onChange={handleSelectParticipant} defaultValue="">
        <option value="" disabled>
          참여자 선택
        </option>
        {participants.map((participant) => (
          <option key={participant} value={participant}>
            {participant}
          </option>
        ))}
      </select>

      <div>
        <h4>참여자</h4>
        <ul>
          {selectedParticipants.map((participant) => (
            <li key={participant}>
              {participant}{' '}
              <button onClick={() => handleRemoveParticipant(participant)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleSubmitToDB}>DB에 저장</button>
    </div>
  );
};

export default ParticipantSelector;
