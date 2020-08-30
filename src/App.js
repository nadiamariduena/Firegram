import React, { useState } from "react";
import Title from "./comps/Title";
import UploadForm from "./comps/UploadForm";
import ImageGrid from "./comps/imageGrid";
import Modal from "./comps/Modal";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  // useState(null); because when we first upload the page, we have not yet selected an image

  /* 


we need to update this value: selectedImg inside:   <ImageGrid />  when we click on an image so
copy this : setSelectedImg and paste it inside the  : <ImageGrid /> like so:  
<ImageGrid setSelectedImg={setSelectedImg} />

You are of course passing it as a props, now go back to the ImageGrid and accept it as a props, like so:

const ImageGrid = ({ setSelectedImg }) => {
 */
  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
      {/* 
      

       {selectedImg &&


      what this means is: i want to check for selectedImg and
      && only if this TRUE:  {selectedImg && ,  will this then will be rendered:
      
      <Modal selectedImg={selectedImg}

      The only problem NOW is that after you click , you are not able to close it.
      
      to allow closing it, you will attach a CLICK EVENT HANDLER to the backdrop,
      so that when you clik on that it closes the MODAL.

      1- attach the event to the backdrop div inside the Modal.js
      2_ use the setSelectedImg  and set it up to null again but first you need to pass it as a props to use it there:

                                      like so :
                                      setSelectedImg={setSelectedImg} />
        from this file, line 28:
       <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      
      
      
      */}
    </div>
  );
}

export default App;
