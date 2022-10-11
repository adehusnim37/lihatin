import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import fieldErrors from '../helpers/fieldErrors';
import { getLinkByShort, updateLink } from '../store/actions/links';

function Edit(props) {
    const [url, setUrl] = useState('')
    const [shortUrl, setShort] = useState('')

    const navigate = useNavigate()
    const params = useParams()
    const { short } = params

    const ERRORS = fieldErrors(props.link?.errField)

    const updateHandler = async (e) => {
        e.preventDefault()

        let data = {
            url: url || props.link.data.url,
            short: shortUrl || props.link.data.short
        }

        await props.dispatch(updateLink(data, props.link.data.id))
        navigate(`/dashboard`)
    }

    useEffect(() => {
        props.dispatch(getLinkByShort(short))
    }, [])
    return (
        <div>
            <section id="hero" className="section-1">
                <div className="container">
                    <div>
                        <div className="title text-center">
                            <h1><span className="highlight">Edit</span> link</h1>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="col-md-8">
                                <form onSubmit={updateHandler} method="post" autoComplete='off'>
                                    <div className="mb-4">
                                        <input type="text" className='form-control' name="url" id="url" defaultValue={props?.link?.data?.url} onChange={(e) => setUrl(e.target.value)} placeholder='Masukkan link panjang Anda' />
                                        <p className='text-danger'>{ERRORS?.url?.message}</p>
                                    </div>
                                    <div className="mb-4">
                                        <div className="d-flex align-items-center">
                                            <span className="text-white me-4">{process.env.REACT_APP_BACKEND_DOMAIN}/</span>
                                            <input type="text" className='form-control' name="short" id="short" defaultValue={props?.link?.data?.short} onChange={(e) => setShort(e.target.value)} placeholder='Buat link pendek' />
                                        </div>
                                        <p className='small text-danger mt-2'>{ERRORS?.short?.message}</p>
                                    </div>
                                    <div className="text-center">
                                        <button type='submit' className="btn btn-blue" disabled={props.link.loading}>Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        link: state.links
    }
}

export default connect(mapStateToProps, null)(Edit);