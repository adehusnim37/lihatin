import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../helpers/formatDate';

function LinkCard({ short, url, views, date }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="link-card">
                <p className="highlight bold mb-3"><strong>{process.env.REACT_APP_BACKEND_DOMAIN}/{short}</strong></p>
                <p className="mb-2">Link: {url}</p>
                <p className="mb-2">Created {formatDate(date)}</p>
                <p className="mb-2">Hits: {views}</p>
                <div className="mt-3">
                    <Link to={`/detail/${short}`} className="btn btn-blue mb-2 me-2">Detail</Link>
                    <Link to={`/edit/${short}`} className="btn btn-blue mb-2">Edit</Link>
                </div>
            </div>
        </div>
    );
}

export default LinkCard;