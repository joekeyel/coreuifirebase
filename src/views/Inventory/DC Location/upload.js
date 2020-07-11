import React, { Component } from 'react';
import '../css/style.css';

export default class SingleImageUploadComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            fileBlob: null,
        }
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }

    uploadSingleFile(e) {
        var files = e.target.files;
        this.setState({
            file: URL.createObjectURL(files[0])
        })

        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) =>{
            var formData = {file: e.target.result}
            //console.log('onload',formData);
            this.setState({
                fileBlob: formData
            })
        }

       // console.log('file', e.target.files)
        //console.log('reader',reader.readAsDataURL(files[0]))
    }

    upload(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        let blobFile = this.state.fileBlob
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img className="img-upload" src={this.state.file} alt='' style={{width: 'auto', height: '150px'}} />;
        }
        return (
            <form>
                <div className="form-group preview">
                    {imgPreview}
                </div>
                <div className="form-group">
                    <input type="file" id={this.props.id} name={this.props.name} className="form-control" onChange={this.uploadSingleFile} />
                    {/* <input type="text" id="LOCN_FLOORPLAN_BLOB" name="LOCN_FLOORPLAN_BLOB" className="form-control" value={blobFile} onChange={this.uploadSingleFile} hidden/> */}
                </div>
                {/* <button type="button" className="btn btn-primary btn-block" onClick={this.upload}>Upload</button> */}
            </form >
        )
    }
}