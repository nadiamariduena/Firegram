import React from "react";
import useStorage from "../hooks/useStorage";
import { useEffect } from "react";

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
                                    --------------------------------------------------------








    */

  useEffect(
    () => {
      // if we have a valid value (thats is not null), at that point we want  to set the file and
      // set the file to be EQUAL to NULL
      if (url) {
        //   this if condition, will make the PROGRESS BAR disappear after the download of the file is completed
        setFile(null);
      }
    },
    [url],
    setFile
    // You need to add the SETFILE here because you are using it inside the statement
  );
  /*


                                                seEffect(() => {  }, [url]);
  
                                     Here you will pass a FUNCTION that will run when the URL changes
  
  
  
  
  */

  return (
    <div className="progress-bar" style={{ width: progress + "%" }}></div>
    /*






                                                    style={{ width: progress + "%" }}>    
       
       
                                    CONCERNS the progression bar, when you will download an image, while
                                    the image is progressing the width will grow in the porcentage. the 
                                    height of the with is in the css
                                    --------------------------------------------------

                               **    REMOVING THE PROGRESS bar once it reaches the 100%
                               as we dont want that it remains there.

                               to remove it, we need to SET the value of file back to null
                               
                               line 7:
                               ({ file, 

                               because remember we only show the PROGRESS BAR if the "file" has a value
                               (if the user downloaded something). SO we can set the value back to null
                               by using this function:

                               line: 7:
                               setFile })

                               we will do that when we will have a URL to use, because at that point we 
                               know the file is fully uploaded, because we only get that FILE after 
                               the upload is COMPLETED.



*/
  );
};

export default ProgressBar;
