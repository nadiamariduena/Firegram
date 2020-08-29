import React from "react";
// connected to the 5__ step
import { useState } from "react";

// 1__
const UploadForm = () => {
  // 5__  ------
  const [file, setFile] = useState(null);
  /* useState(null); 
 is NULL to begin with because there s no image before you click on 
 the button to see what you have in your local, so when you click on the button which is the :
       <input type="file" onChange={changeHandler} />  , you launch the function which is onChange={changeHandler},
       from that moment if the user choose an image it s going to be true, if the user 'cancels' it s going
       to be undefined.

*/

  // The error that will be shown if the user chooses an incorrect type of file.
  // this error is connected to :
  /*
  else {
      setFile(null);
    }
  
  */
  //  8:___
  const [error, setError] = useState();

  // -----
  // the allowed FILE types:
  // ------
  // 7__
  //
  const types = ["image/png", "image/jpg", "image/jpeg"];
  //
  //

  // 2_
  const changeHandler = (e) => {
    // with this you will select one file: e.target.files[0];
    // to see what you have selected console.log(selected)
    // 4_
    let selected = e.target.files[0];
    //
    //
    // _6  You need this statement to verify 'if or what' type of file the user upload.
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      // 11
      setError(" ");
    } else {
      // connected to step 5__
      setFile(null);

      // if the file that the user wants to upload don't correspond to what is inside the type: types
      // IF SO, then show and error, here the error will be just resetting to null again, you can also send an alert
      // but alerts are a ugly :)     alert("choose a correct file");
      // 9__
      setError("Please select an image file (png or jpeg or jpeg");
    }
  };

  return (
    <form>
      {/* 3__ */}
      <label>
        <input type="file" onChange={changeHandler} />
        <span>
          <ion-icon name="add-circle-outline"></ion-icon>
        </span>
      </label>
      {/* __10__ */}
      <div className="output">
        {error && <div className="error">{error}</div>}
        {/* AFTER you type the above, go to the browser and try uplading a mp3 and then an image
        You will see that you will still have an error:   ("Please select an image file (png or jpeg or jpeg") */}
        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
};

export default UploadForm;

//  input type="file"
// is going to allow users to upload images in the page
