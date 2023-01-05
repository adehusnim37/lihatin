import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';

import { getLinkByShort } from '../store/actions/links';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import copy from '../assets/img/copy.svg';
import qr from '../assets/img/qr-code.svg';
import toast from 'react-hot-toast';
import formatDate from '../helpers/formatDate';

function Detail(props) {
    const params = useParams()
    const { short } = params

    const copied = () => {
        toast.success("Link copied to clipboard")
    }

    const downloadImage = () => {
        saveAs(`${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_DOMAIN}/images/qr/${props.link.id}.png`, `qr-${props.link.short}.png`)
    }

    useEffect(() => {
        props.dispatch(getLinkByShort(short))
    }, [])
    return (
        <section id="hero" className="section-1">
            <div className="container">
                <div>
                    <div className="title text-center">
                        <h1><span className="highlight">Detail</span> link</h1>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-md-8">
                            <div className="d-flex justify-content-between">
                                <p className="text-muted">Hits: {props.link.views}</p>
                                <p className="text-muted">Created: {props?.link?.createdAt && formatDate(props.link.createdAt)}</p>
                            </div>
                            <form autoComplete="off">
                                <div className="input-group mb-5">
                                    <input type="text" className="form-control" value={`${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_DOMAIN}/${props.link.short}`} disabled
                                        aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2">
                                        <CopyToClipboard text={`${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_DOMAIN}/${props.link.short}`} className="pointer">
                                            <img onClick={copied} src={copy} alt="" />
                                        </CopyToClipboard>
                                    </span>
                                    <span className="input-group-text" id="basic-addon2">
                                        <button className="no-btn" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img src={qr} alt="" />
                                        </button>
                                    </span>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">QR CODE</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body text-center">
                                                    <img src={`${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_DOMAIN}/images/qr/${props.link.id}.png`} alt="" />
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" onClick={downloadImage} className="btn btn-primary">Download</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="text-center">
                                    <a href={`${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_DOMAIN}/${props.link.short}`} className="btn btn-blue">Menuju link</a>
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
        link: state.links.data
    }
}

export default connect(mapStateToProps, null)(Detail);