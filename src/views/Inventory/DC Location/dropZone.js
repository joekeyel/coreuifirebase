import * as React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

const UploadFile = (props) =>{

  const file = new File(["foo"], "foo.txt", {
    type: "text/plain",
  });
  

return(<div>
    <DropzoneArea
      id="RACK_UTIL" 
      name="RACK_UTIL"
      initialFiles = {[file]}
      onChange={(files) => console.log('Files:', files)}
      filesLimit={1}
      //showPreviews={true}
      //showPreviewsInDropzone={false}
    />
</div>)

}

export default UploadFile;