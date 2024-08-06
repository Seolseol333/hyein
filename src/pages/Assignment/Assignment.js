import './Assignment.css';
import React, { useState } from 'react';
import { IoMenu, IoAddCircle, IoPerson, IoBookmark } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Assignment() {
    const [namePlaceholder, setNamePlaceholder] = useState('과제명을 적어주세요');
    const [textPlaceholder, setTextPlaceholder] = useState('과제의 상세 설명을 적어주세요');
    const [formData, setFormData] = useState('');
    
    const handleFocus = (field) => {
        if (field==='name') {
            setNamePlaceholder('');
        } else if (field==='text') {
            setTextPlaceholder('');
        }
        
    };
    
    const handleBlur = (field) => {
        if (field === 'name' && formData.name === '') {
            setNamePlaceholder('과제의 상세 설명을 적어주세요');
        } else if (field === 'text' && formData.text === '') {
            setTextPlaceholder('과제의 상세 설명을 적어주세요')
        }
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...formData,
            deadline: formData.deadline || '미정'
          };
        console.log('Submitted:', formData);
        setFormData({
            name:'',
            text:'',
            role:'',
            type:'',
            diff:'',
            deadline:''
        });
    };

    return (
        <div className="Assignment">
            <header className="Assignment-header">
                <div className="my-page-logout">
                <IoPerson size={24} />
                <a href="/mypage">마이페이지</a> | <a href="/logout">로그아웃</a>
                </div>
            </header>
            <main>
                <div className="Assignment-content">
                    <div>
                        <form className="As-create-form" onSubmit={handleSubmit}>
                            <div className="setting-list">
                                <select
                                id='role'
                                name='role'
                                value={formData.role}
                                onChange={handleChange}
                                >
                                    <option value="미정" disabled>담당자</option>
                                    <option value="참여자1">1</option> {/*이부분 나중에 팀원 입력했을 때의 입력값이 뜨도록 해야함*/}
                                </select>
                                <select 
                                id='type'
                                name='type'
                                value={formData.type}
                                onChange={handleChange}
                                >
                                    <option value="미정" disabled>과제분류</option> {/*이부분도 분류 대강 짠 다음에 추가해야함*/}
                                </select>
                                <select 
                                id='diff'
                                name='diff'
                                value={formData.diff}
                                onChange={handleChange}
                                >
                                    <option value="미정" disabled>과제 복잡도</option>
                                    <option value="간단함">간단함</option>
                                    <option value="복잡함">복잡함</option>
                                </select>
                                <input 
                                type='date'
                                id='deadline'
                                name='deadline'
                                value={formData.deadline}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="As-name">
                                <input
                                type="text"
                                value={formData.name}
                                placeholder={namePlaceholder}
                                onFocus={() => handleFocus('name')}
                                onBlur={() => handleBlur('name')}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <div className="As-text">
                                <input
                                type="text"
                                value={formData.text}
                                placeholder={textPlaceholder}
                                onFocus={() => handleFocus('text')}
                                onBlur={() => handleBlur('text')}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            <button type="submit">생성</button>
                        </form>
                        <div className="Assignment-look">
                            <div className="my-assignment">
                                <h6>내 과제 보기</h6>
                                <div className="my-as-item">
                                    <p>과제 이름</p>
                                </div>

                            </div>
                            <div className="all-assignment">
                                <h6>전체 과제 보기</h6>
                                <div className='all-as-item'>
                                    <p>과제 이름</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="comment">
                        <h6>최신 댓글 알림</h6>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Assignment;