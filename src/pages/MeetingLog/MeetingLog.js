import React, { useState } from 'react';
import { IoMenu, IoAddCircle, IoPerson, IoBookmark } from "react-icons/io5";

function MeetingLog() {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('Initial Title');
    const [content, setContent] = useState('This is the initial content.');
    const [dropdownValues, setDropdownValues] = useState({
        role: 'Option 1',
        type: 'Option 1',
        diff: 'Option 1',
    });
    const [deadline, setDeadline] = useState('');
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('https://example.com');
    const [isDeleted, setIsDeleted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

  
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

    const handleDropdownChange = (e) => {
        const { name, value } = e.target;
        setDropdownValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

}

export default MeetingLog;