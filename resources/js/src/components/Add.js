import React, { useState } from 'react';
import AppContainer from './AppContainer';
import { useHistory } from "react-router-dom";
import api from '../api';

const Add = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addPost({
                title, description
            })
            history.push('/');
        } catch {
            alert('failed to add post');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppContainer title="ADD POST">
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label for="textarea">Description</label>
                    <textarea className="form-control" id="textarea" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <button type="button" onClick={onAddSubmit} disabled={loading} className="btn btn-primary">{loading ? 'Loading..':'Simpan'}</button>
            </form>
        </AppContainer>
    );
}

export default Add;
