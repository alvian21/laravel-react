import React, { useState, useEffect } from 'react';
import AppContainer from './AppContainer';
import { useHistory, useParams } from "react-router-dom";
import api from '../api';

const Edit = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updatePost({
                title, description
            }, id)
            history.push('/');
        } catch {
            alert('failed to Edit post');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        api.getOnePost(id).then(res => {
            const result = res.data;
            const post = result.data;
            setTitle(post.title);
            setDescription(post.description)
        })
    }, [])

    return (
        <AppContainer title="Edit POST">
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label for="textarea">Description</label>
                    <textarea className="form-control" id="textarea" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <button type="button" onClick={onEditSubmit} disabled={loading} className="btn btn-primary">{loading ? 'Loading..' : 'Simpan'}</button>
            </form>
        </AppContainer>
    );
}

export default Edit;
