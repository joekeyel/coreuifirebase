import React, { Component } from 'react';
import '../css/style.css';
import {DropzoneArea} from 'material-ui-dropzone';

export default class DropzoneExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }
 
    handleClose() {
        this.setState({
            open: false
        });
    }
 
    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }
 
    handleOpen() {
        this.setState({
            open: true,
        });
    }
 
    render() {
        return (
            <div>
                <DropzoneArea
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    //acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    //showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}
