import { useState, useEffect } from "react";
//
//
//
import { projectStorage } from "../firebase/config";
//
/*


            - Use in REACT are just a way a small chunk of reusable code
              then those HOOKS can be used in whatever components need them.

            -Our HOOK is basically just a function, just as all hooks are and 
             this function will be responsible for handling our FILES UPLOADS,
             and then returning some useful values about that upload, such as
              the UPLOAD progress, any errors and the image URL after its 
              uploaded.
              

*/
// the (file) here is connected to step 5 inside the UploadForm.js
const useStorage = (file) => {
  /*



              // Here you are going to create 3 pieces of the state, 
              this useState is connected to the first line of this file,
              here you are requiring from react that specific library:

              import { useState, useEffect } from "react";


*/
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, set] = useState(null);
  //   this is the img URL i will get back from storage, after the image has fully uploaded
  //
  /*
                  useEffect(()=>{

                   }, [file])


                This FUNCTION inside useEffect, is going to fire every time 
                this dependency: [file]  changes, SO every time we have a new  (file) => {  
                 value, we are going to run the code inside the function to upload that file.

     */

  useEffect(() => {
    // This will create a reference to the file inside the default FIREBASE STORAGE bucket
    const storageRef = projectStorage.ref(file.name);
    //
    //
    //

    // the following line :  storageRef.put(file)  ,means that  the (file) is going to be put/or downloaded to
    // the reference projectStorage, here: projectStorage.ref(file.name);
    storageRef.put(file).on("state_changed", (snap) => {
      /*         
      
      
      
                DESCRIPTION:            **         storageRef.put(file).on("state_changed"
    
                                        **     storageRef.put(file)  THIS IS Asynchronous, 
                                            and it will take some time to fulfil the task
                                     And you can attach LISTENER to it, this listener is going to 
                                    fire functions when certain events happens(clicking for example)

    
                                        **            on("state_changed"

                                      means:  that whatever the state of the uploaded changed, whenever the
                                      progress changed or is complete, we are going to fire a function, that 
                                      function will be the 2 argument ...


                                     * *                    (snap)
                                    inside the function with 2 argument you have the snap shot:
                                     the snap shot is basically a snapshot in time of the UPLOAD
                                     in that moment in time, this state change event might happen 
                                     2 or 4 etc times, during the cycle of the UPLOAD, so we might FIRE this
                                     function several times while its being uploaded.

   
    */

      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    });
  }, [file]);
  /*
                     DESCRIPTION:    **     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    
                                    **     (snap.bytesTransferred / snap.totalBytes)
                                    **      bytesTransferred  reserved word
                                      





     */
};
