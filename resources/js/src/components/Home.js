import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../api';

const Home = () => {

    const [posts, setPosts] = useState(null);

    const fetchPosts = () => {
        api.getAllPosts().then(res => {
            const result = res.data;
            setPosts(result.data);
        })
    }
    useEffect(() => {
        fetchPosts();
    }, []);

    const renderPosts = () => {
        if (!posts) {
            return (
                <tr>
                    <td colSpan="4">Loading...</td>
                </tr>
            );
        }

        if (posts.length === 0) {
            return (
                <tr>
                    <td colSpan="4">Belum ada post</td>
                </tr>
            );
        }

        return posts.map((post) => (
            <tr>
                <th scope="row">{post.id}</th>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>
                    <Link to={`/edit/${post.id}`} className="btn btn-warning">EDIT</Link>
                    <button type="button"
                        onClick={() => {
                            api.deletePost(post.id).then(fetchPosts)
                                .catch(err => {
                                    alert('failed to delete post')
                                })
                        }}
                        className="btn btn-danger">DELETE</button>
                </td>
            </tr>
        ));
    }

    return (
        <AppContainer title="Laravel Reactjs CRUD">
            <Link to="/add" className="btn btn-primary">Add Data</Link>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderPosts()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
}

export default Home;
