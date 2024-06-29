"use client";

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setSelection, setIdUser, setIdGroup, addTopicUser, removeTopicUser, addTopicGroup, removeTopicGroup } from '@/store/userSlice/userSlice';

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
      <div>
        <h1>Админ Панель</h1>
        <div>
          <button onClick={() => dispatch(setSelection('participant'))}>Участник</button>
          <button onClick={() => dispatch(setSelection('group'))}>Группа</button>
        </div>
        <div>
          <label>Введите ID:</label>
          <select value={selectedId} onChange={handleIdChange}>
            <option value="">ВЫБЕРИТЕ ID</option>
            {(selection === 'participant' ? id_user_list : id_group_list).map((id) => (
                <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        {selectedId && (
            <div>
              <h2>Темы</h2>
              <ul>
                {topics.map((topic, index) => (
                    <li key={index}>
                      {index + 1}. {topic}
                      <button onClick={() => dispatch(selection === 'group' ? removeTopicGroup({ id: id_group!, index }) : removeTopicUser({ id: id_user!, index }))}>Удалить</button>
                    </li>
                ))}
              </ul>
            </div>
        )}
        {selectedId && (
            <div>
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
  );
};

export default AdminPanel;
