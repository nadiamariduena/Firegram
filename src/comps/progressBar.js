import React from "react";
import useStorage from "../hooks/useStorage";

//
//
//
const ProgressBar = ({ file, setFile }) => {
  /*
    

                        ProgressBar = ()   

                        1_ Inside of the ProgressBar = () , you need to use the useStorage HOOK, but first of all
                        you need to get the props that you just passed inside the UploadForm.js (line 103) :

                                        **      file={file} setFile={setFile}
    
    
               
    
    */

  const { url, progress } = useStorage(file);
  console.log(progress, url);

  /*
    

                        const { url, progress } = useStorage(file);   

                        2_ here we are going to use the useStorage HOOK, so you are going to say const and you
                        are going to get back from this: { url, once the upload is complete, and also the progress
                        of the UPLOAD, so remember we return those things here from the useStorage:

                                                **   return { progress, url, error };

                                        We are not using the ERROR yet, we are going to set that equal over here
                                        , to use storage like so and pass in the file.

                                        SO the MINUTE that we do this, this HOOK: useStorage ,  is going to fire
                                        this things right here (line:227  from the useStorage.js):  

                                        return { progress, url, error };
    
                                    that is inside the useEffect, and its going to take the file, create a REFERENCE
                                    CHECK (line:55  from the useStorage.js): 

                                **   projectStorage.ref(file.name);

                                and try to upload that file  (line:62  from the useStorage.js):  
                                
                                **  .put(file).on(
    
                                    and in that moment in time we get values back for progress and then when 
                                    its DONE the URL as well.
    */
  return <div className="progress-bar">progress</div>;
};

export default ProgressBar;
