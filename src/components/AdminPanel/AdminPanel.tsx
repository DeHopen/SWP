'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {
    setSelection,
    setIdUser,
    setIdGroup,
    addTopicUser,
    removeTopicUser,
    addTaskToTopicUser,
    removeTaskFromTopicUser,
    addTopicGroup,
    removeTopicGroup,
    addTaskToTopicGroup,
    removeTaskFromTopicGroup
} from '@/store/userSlice/userSlice';
import "@/components/styles/AdminPanel.scss";
import { useCreateTopicMutation, useDeleteTopicMutation, useGetTopicsQuery } from '@/store/api/topicsApi';
import { useCreateTaskMutation, useGetTasksQuery } from '@/store/api/taskApi';
import { skipToken } from '@reduxjs/toolkit/query/react';

const AdminPanel = () => {
    const dispatch: AppDispatch = useDispatch();
    const { selection, id_user_list, id_group_list, id_user, id_group, topics_user, topics_group } = useSelector((state: RootState) => state.user);

    const [newTopic, setNewTopic] = useState('');
    const [newTask, setNewTask] = useState('');
    const [selectedId, setSelectedId] = useState<string>('');
    const [selectedTopic, setSelectedTopic] = useState<string>('');

    const [createTopic] = useCreateTopicMutation();
    const [deleteTopic] = useDeleteTopicMutation();
    const [createTask] = useCreateTaskMutation();
    const [id, setId] = useState<string>("2");
    const { data: topic, isLoading } = useGetTopicsQuery(id);
    const { data: tasks, error: tasksError, isLoading: isLoadingTasks } = useGetTasksQuery(
        selectedTopic && selectedId ? { topic_id: selectedTopic, user_id: selectedId } : skipToken, {
            skip: !selectedTopic || !selectedId,
        }
    );

    const handleAddTopic = async () => {
        if (newTopic.trim() !== '') {
            try {
                if (selection === 'group') {
                    await createTopic({ topic: newTopic, user_id: id_group! }).unwrap();
                    dispatch(addTopicGroup({ id: id_group!, topic: newTopic }));
                } else {
                    await createTopic({ topic: newTopic, user_id: id_user! }).unwrap();
                    dispatch(addTopicUser({ id: id_user!, topic: newTopic }));
                }
                setNewTopic('');
            } catch (error) {
                console.error('Failed to add topic:', error);
            }
        }
    };

    const handleRemoveTopic = async (topic: string) => {
        try {
            if (selection === 'group') {
                await deleteTopic({ topic_id: topic, user_id: id_group! }).unwrap();
                dispatch(removeTopicGroup({ id: id_group!, topic }));
            } else {
                await deleteTopic({ topic_id: topic, user_id: id_user! }).unwrap();
                dispatch(removeTopicUser({ id: id_user!, topic }));
            }
            if (selectedTopic === topic) {
                setSelectedTopic('');
            }
        } catch (error) {
            console.error('Failed to remove topic:', error);
        }
    };

    const handleAddTask = async () => {
        if (newTask.trim() !== '') {
            try {
                if (selection === 'group') {
                    await createTask({ description: newTask, name: newTask, topic_id: selectedTopic, user_id: id_group! }).unwrap();
                    dispatch(addTaskToTopicGroup({ id: id_group!, topic: selectedTopic, task: newTask }));
                } else {
                    await createTask({ description: newTask, name: newTask, topic_id: selectedTopic, user_id: id_user! }).unwrap();
                    dispatch(addTaskToTopicUser({ id: id_user!, topic: selectedTopic, task: newTask }));
                }
                setNewTask('');
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        }
    };

    const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedId(selectedValue);
        setSelectedTopic(''); // Reset selected topic when ID changes
        if (selection === 'participant') {
            dispatch(setIdUser(selectedValue));
        } else {
            dispatch(setIdGroup(selectedValue));
        }
    };

    const handleRemoveTask = (taskId: string) => {
        if (selection === 'group') {
            dispatch(removeTaskFromTopicGroup({ id: id_group!, topic: selectedTopic, taskId }));
        } else {
            dispatch(removeTaskFromTopicUser({ id: id_user!, topic: selectedTopic, taskId }));
        }
    };

    useEffect(() => {
        setSelectedId(selection === 'participant' ? (id_user !== null ? id_user : '') : (id_group !== null ? id_group : ''));
    }, [selection, dispatch, id_user, id_group]);

    const topics = selection === 'group' ? (id_group ? topics_group[id_group] || {} : {}) : (id_user ? topics_user[id_user] || {} : {});
    const currentTasks = tasks ? tasks : [];

    return (
        <div className='main-user-page'>
            <h1 className="title">Math Helper</h1>
            <main>
                <div className="documentation"></div>
                <div>
                    <div className="choose-type">
                        <label>Выберите:</label>
                        <button style={{ backgroundColor: selection === 'participant' ? '#CDCDFF' : 'white' }}
                                onClick={() => dispatch(setSelection('participant'))}>Участник</button>
                        <button style={{ backgroundColor: selection === 'group' ? '#CDCDFF' : 'white' }}
                                onClick={() => dispatch(setSelection('group'))}>Группа</button>
                    </div>
                    <div className="choose-id">
                        <label>Введите ID {(selection === 'participant' ? "участника" : "группы")}:</label>
                        <select value={selectedId} onChange={handleIdChange}>
                            <option value="">ВЫБЕРИТЕ ID</option>
                            {(selection === 'participant' ? id_user_list : id_group_list).map((id) => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select>
                    </div>
                    {selectedId && (
                        <div>
                            <label>Темы {(selection === 'participant' ? "участника" : "группы")}:</label>
                            <ul className={`topics ${Object.keys(topic).length === 0 ? 'empty-topics' : ''}`}>
                                {Object.keys(topic).map((top, index) => (
                                    <li key={index}>
                                        <div className="topic-item" onClick={() => setSelectedTopic(top)}>
                                            {index + 1}. {top}
                                            <button onClick={() => handleRemoveTopic(topic)}>Удалить</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {selectedId && (
                        <div className="add-topic">
                            <label>Добавить тему:</label>
                            <input
                                type="text"
                                value={newTopic}
                                onChange={(e) => setNewTopic(e.target.value)}
                                placeholder="Напишите тему"
                            />
                            <button onClick={handleAddTopic}>Добавить</button>
                        </div>
                    )}
                    {selectedTopic && (
                        <div className="add-task">
                            <label>Задачи для {selectedTopic}:</label>
                            <ul className="tasks">
                                {currentTasks.map((task:any, index:any) => (
                                    <li key={task.id}>
                                        {index + 1}. {task.name}
                                        <button onClick={() => handleRemoveTask(task.id)}>Удалить</button>
                                    </li>
                                ))}
                            </ul>
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Напишите задачу"
                            />
                            <button onClick={handleAddTask}>Добавить задачу</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
