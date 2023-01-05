import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import fieldErrors from '../helpers/fieldErrors';
import { createLink } from '../store/actions/links';

function Home(props) {
    const [url, setUrl] = useState('')
    const [short, setShort] = useState('')

    const [custom, setCustom] = useState(false)

    const navigate = useNavigate()

    const ERRORS = fieldErrors(props.links?.errField)

    const createHandler = async (e) => {
        e.preventDefault()

        let data = {
            url,
            short
        }

        let res = await props.dispatch(createLink(data))
        navigate(`/detail/${res.short}`)
    }

    return (
        <section id="hero" className="section-1">
            <div className="container">
                <div>
                    <div className="title text-center">
                        <h1>Pendekin <span className="highlight">linkmu</span> sekarang</h1>
                        <h1>Dengan sekali <span className="highlight">klik</span></h1>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-md-8">
                            <form onSubmit={createHandler} method="post" autoComplete='off'>
                                <div className="mb-4">
                                    <input type="text" className="form-control" name="url" id="url" value={url} onChange={(e) => setUrl(e.target.value)}
                                        placeholder="Masukkan link panjang Anda" />
                                    <p className='small text-danger mt-2'>{ERRORS?.url?.message}</p>
                                </div>
                                {
                                    custom &&
                                    <div className="mb-4">
                                        <div className="d-flex align-items-center">
                                            <span className="text-white me-4">{process.env.REACT_APP_BACKEND_DOMAIN}/</span>
                                            <input type="text" className="form-control" name="short" id="short" value={short} onChange={(e) => setShort(e.target.value)}
                                                placeholder="Buat link pendek" />
                                        </div>
                                        <p className='small text-danger mt-2'>{ERRORS?.short?.message}</p>
                                    </div>
                                }
                                <div className="text-end">
                                    <p>Atau gunakan <span className='highlight pointer' onClick={() => setCustom(!custom)}>{custom ? `default `:`custom `}link</span></p>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-blue" disabled={props.links.loading}>Pendekan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = (state) => {
    return {
        links: state.links
    }
}

export default connect(mapStateToProps, null)(Home);