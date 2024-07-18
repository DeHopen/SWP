"use client"

import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setType, setSelectedId, addTopic, removeTopic, addTask, removeTask } from '@/store/userSlice/userSlice';
import '@/components/styles/AdminPanel.scss'

const AdminPanel: React.FC = () => {
    const [newTopic, setNewTopic] = useState('');
    const [newTask, setNewTask] = useState('');
    const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(null);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const currentData = user.type === 'participant' ? user.participantData[user.selectedId ?? ''] : user.groupData[user.selectedId ?? ''];

    useEffect(() => {
        console.log("Loaded state:", user);
    }, [user]);

    const handleAddTopic = () => {
        if (newTopic) {
            dispatch(addTopic(newTopic));
            setNewTopic('');
        }
    };

    const handleAddTask = () => {
        if (newTask && selectedTopicIndex !== null) {
            const task = `${currentData.topics[selectedTopicIndex]}: ${newTask}`;
            dispatch(addTask(task));
            setNewTask('');
        }
    };

    const handleTypeChange = (type: 'participant' | 'group') => {
        dispatch(setType(type));
        setSelectedTopicIndex(null); // сброс выбранной темы при смене типа
    };

    const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedId(e.target.value));
        setSelectedTopicIndex(null); // сброс выбранной темы при смене ID
    };

    const selectTopic = (index: number) => {
        setSelectedTopicIndex(selectedTopicIndex === index ? null : index);
    };

    const handleRemoveTopic = (index: number) => {
        dispatch(removeTopic(index));
        if (selectedTopicIndex === index) {
            setSelectedTopicIndex(null); // сброс выбранной темы, если она удаляется
        } else if (selectedTopicIndex !== null && selectedTopicIndex > index) {
            setSelectedTopicIndex(selectedTopicIndex - 1); // корректировка индекса, если удаляемая тема перед выбранной
        }
    };

    return (
        <div className="admin-panel">
            <div className="header">
                <div className="type-selection">
                    <button onClick={() => handleTypeChange('participant')}
                            className={user.type === 'participant' ? 'active' : ''}>Участник
                    </button>
                    <button onClick={() => handleTypeChange('group')}
                            className={user.type === 'group' ? 'active' : ''}>Группа
                    </button>
                </div>
                <select className="dropdown" onChange={handleIdChange} value={user.selectedId || ''}>
                    <option value="">Выберите ID</option>
                    {user.type === 'participant'
                        ? Object.keys(user.participantData).map((id) => <option key={id} value={id}>{id}</option>)
                        : Object.keys(user.groupData).map((id) => <option key={id} value={id}>{id}</option>)}
                </select>
            </div>
            {user.selectedId && (
                <div className="content">
                    <div className="column">
                        <h3>Темы {user.type === 'participant' ? 'участника' : 'группы'} ID:</h3>
                        <ul>
                            {currentData?.topics.map((topic, index) => (
                                <li key={index}>
                  <span onClick={() => selectTopic(index)} style={{ cursor: 'pointer' }}>
                    {index + 1}. {topic}
                  </span>
                                    <span className="delete-btn" onClick={() => handleRemoveTopic(index)}>🗑</span>
                                </li>
                            ))}
                        </ul>
                        <div className="form">
                            <input
                                type="text"
                                placeholder="Напишите тему"
                                value={newTopic}
                                onChange={(e) => setNewTopic(e.target.value)}
                            />
                            <button onClick={handleAddTopic}>Добавить тему</button>
                        </div>
                    </div>
                    {selectedTopicIndex !== null && (
                        <div className="column">
                            <h3>Задачи для {currentData.topics[selectedTopicIndex]}:</h3>
                            <ul>
                                {currentData?.tasks
                                    .filter(task => task.startsWith(`${currentData.topics[selectedTopicIndex]}:`))
                                    .map((task, taskIndex) => (
                                        <li key={taskIndex}>
                                            {task.replace(`${currentData.topics[selectedTopicIndex]}: `, '')}
                                            <span className="delete-btn" onClick={() => dispatch(removeTask(taskIndex))}>🗑</span>
                                        </li>
                                    ))}
                            </ul>
                            <div className="form">
                                <input
                                    type="text"
                                    placeholder="Напишите задачу"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                />
                                <button onClick={handleAddTask}>Добавить задачу</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;