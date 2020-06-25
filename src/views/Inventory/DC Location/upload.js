import React, { Component } from 'react';
import '../css/style.css';

export default class SingleImageUploadComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    upload(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img className="img-upload" src={this.state.file} alt='' style={{width: '250px', height: '150px'}} />;
        }
        return (
            <form>
                <div className="form-group preview">
                    {imgPreview}
                </div>
                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadSingleFile} />
                </div>
                {/* <button type="button" className="btn btn-primary btn-block" onClick={this.upload}>Upload</button> */}
            </form >
        )
    }
}