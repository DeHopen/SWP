"use client";

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setSelection, setIdUser, setIdGroup, addTopicUser, removeTopicUser, addTopicGroup, removeTopicGroup } from '@/store/userSlice/userSlice';
import "@/components/styles/AdminPanel.scss";

const AdminPanel = () => {
    const dispatch: AppDispatch = useDispatch();
    const { selection, id_user_list, id_group_list, id_user, id_group, topics_user, topics_group } = useSelector((state: RootState) => state.user);

    const [newTopic, setNewTopic] = useState('');
    const [selectedId, setSelectedId] = useState<string>('');

    const handleAddTopic = () => {
        if (newTopic.trim() !== '') {
            if (selection === 'group')
                dispatch(addTopicGroup({ id: id_group!, topic: newTopic }));
            else
                dispatch(addTopicUser({ id: id_user!, topic: newTopic }));
            setNewTopic('');
        }
    };

    const handleIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedId(selectedValue);
        if (selection === 'participant') {
            dispatch(setIdUser(selectedValue));
        } else {
            dispatch(setIdGroup(selectedValue));
        }
    };

    useEffect(() => {
        setSelectedId(selection === 'participant' ? (id_user !== null ? id_user : '') : (id_group !== null ? id_group : ''));
    }, [selection, dispatch, id_user, id_group]);

    const topics = selection === 'group' ? (id_group ? topics_group[id_group] || [] : []) : (id_user ? topics_user[id_user] || [] : []);

    return (
        <div className='admin-panel'>
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
                            <ul className={`topics ${topics.length === 0 ? 'empty-topics' : ''}`}>
                                {topics.map((topic, index) => (
                                    <li key={index}>
                                        <div className="topic-item">
                                            {index + 1}. {topic}
                                            <button onClick={() => dispatch(selection === 'group' ? removeTopicGroup({
                                                id: id_group!,
                                                index
                                            }) : removeTopicUser({id: id_user!, index}))}>Удалить
                                            </button>
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
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
