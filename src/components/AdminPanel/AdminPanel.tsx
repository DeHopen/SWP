'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
    setType,
    setSelectedId,
    addTopic,
    removeTopic,
    addTask,
    removeTask,
    setSelectedTopicId, saveSelectedTopic
} from '@/store/userSlice/userSlice';
import '@/components/styles/AdminPanel.scss';
import { useGetTopicsQuery, useCreateTopicMutation, useDeleteTopicMutation } from '@/store/api/topicsApi';
import { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation } from '@/store/api/taskApi';

interface Topic {
    ID: string; // Предполагаем, что ID - строка, как в вашем примере
    topic: string;
}

const AdminPanel: React.FC = () => {
    const [newTopic, setNewTopic] = useState<string>('');
    const [newTask, setNewTask] = useState<string>('');
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [createTopic] = useCreateTopicMutation();
    const [deleteTopic] = useDeleteTopicMutation();
    const [createTask] = useCreateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    const { data: topicsData, isLoading: isTopicsLoading, refetch: refetchTopics } = useGetTopicsQuery(user.selectedId ?? '');
    const { data: tasksData, isLoading: isTasksLoading, refetch: refetchTasks } = useGetTasksQuery({
        topic_id: user.selectedTopicId ?? '',
        user_id: user.selectedId ?? '',
    });

    useEffect(() => {
        console.log("Loaded state:", user);
    }, [user]);

    useEffect(() => {
        console.log("Topics Data:", topicsData);
    }, [topicsData]);

    useEffect(() => {
        console.log("Tasks Data:", tasksData);
    }, [tasksData]);

    const handleAddTopic = async () => {
        if (newTopic) {
            try {
                console.log('Adding topic:', { id: user.selectedId!, topic: newTopic });
                await createTopic({ id: user.selectedId!, topic: newTopic });
                dispatch(addTopic(newTopic));
                setNewTopic('');
                refetchTopics(); // Refetch topics after adding a new topic
            } catch (error) {
                console.error('Failed to add topic:', error);
            }
        }
    };

    const handleAddTask = async () => {
        if (newTask) {
            try {
                console.log('Adding task:', {
                    desc: newTask,
                    name: newTask,
                    topic_id: user.selectedTopicId!,
                    user_id: user.selectedId!,
                });
                await createTask({
                    desc: newTask,
                    name: newTask,
                    topic_id: user.selectedTopicId!,
                    user_id: user.selectedId!,
                });
                dispatch(addTask({ topicId: user.selectedTopicId!, task: newTask }));
                setNewTask('');
                refetchTasks(); // Refetch tasks after adding a new task
            } catch (error) {
                console.error('Failed to add task:', error);
            }
        }
    };

    const handleTypeChange = (type: 'participant' | 'group') => {
        dispatch(setType(type));
        dispatch(setSelectedTopicId(null)); // сброс выбранной темы при смене типа
    };

    const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedId(e.target.value));
    };

    const handleTopicClick = (topic: Topic) => {
        dispatch(setSelectedTopicId(topic.ID.toString()));
        dispatch(saveSelectedTopic({ id: topic.ID.toString(), topic: topic.topic }));
    };

    const handleRemoveTopic = async () => {
        if (!user.selectedId || !user.selectedTopicId) {
            console.error('User ID or selected topic ID is missing');
            return;
        }

        try {
            console.log('Removing topic:', { user_id: user.selectedId!, topic_id: user.selectedTopicId });
            await deleteTopic({ user_id: user.selectedId!, topic_id: user.selectedTopicId });
            dispatch(removeTopic(user.selectedTopicId));
            dispatch(setSelectedTopicId(null)); // reset selected topic ID after removal
            refetchTopics(); // Refetch topics after removing a topic
        } catch (error) {
            console.error('Failed to remove topic:', error);
        }
    };

    const handleRemoveTask = async (taskId: string) => {
        try {
            console.log('Removing task:', {
                user_id: user.selectedId!,
                task_id: taskId,
            });
            await deleteTask({
                user_id: user.selectedId!,
                task_id: taskId,
            });
            dispatch(removeTask(taskId));
            refetchTasks(); // Refetch tasks after removing a task
        } catch (error) {
            console.error('Failed to remove task:', error);
        }
    };

    const currentTasks = tasksData || [];

    const selectedTopicName = topicsData?.find((topic: Topic) => topic.ID === user.selectedTopicId)?.topic || '';

    return (
        <div className="admin-panel">
            <div className="header">
                <div className="type-selection">
                    <button onClick={() => handleTypeChange('participant')} className={user.type === 'participant' ? 'active' : ''}>
                        Участник
                    </button>
                    <button onClick={() => handleTypeChange('group')} className={user.type === 'group' ? 'active' : ''}>
                        Группа
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
                        {isTopicsLoading ? (
                            <p>Loading topics...</p>
                        ) : (
                            <ul>
                                {topicsData?.map((topic: Topic) => (
                                    <li key={topic.ID}>
                                        <span onClick={() => handleTopicClick(topic)} style={{ cursor: 'pointer' }}>
                                            {topic.topic}
                                        </span>
                                        <button onClick={handleRemoveTopic}>Удалить</button>
                                    </li>
                                ))}
                            </ul>
                        )}
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
                    {user.selectedTopicId && (
                        <div className="column">
                            <h3>Задачи для {selectedTopicName}:</h3>
                            {isTasksLoading ? (
                                <p>Loading tasks...</p>
                            ) : (
                                <ul>
                                    {currentTasks.map((task: any, taskIndex: any) => (
                                        <li key={taskIndex}>
                                            {task.name}
                                            <span className="delete-btn" onClick={() => handleRemoveTask(task.id)}>🗑</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
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
