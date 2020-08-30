import { useState, useEffect } from "react";
//
//
//
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
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
  const [url, setUrl] = useState(null);
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
    //the HOOK
    // This will create a reference to the file inside the default FIREBASE STORAGE bucket
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("images");
    //
    //
    //

    // the following line :  storageRef.put(file)  ,means that  the (file) is going to be put/or downloaded to
    // the reference projectStorage, here: projectStorage.ref(file.name);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
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
        /*




                   EXPLANATION:     **     let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
    
                                    **     (snap.bytesTransferred / snap.totalBytes)
                                    **      bytesTransferred  reserved word, this is a property in the snapshot,
                                            that tells you how many bytes have being transferred at this moment in time
                                            when the FUNCTION is fired, AND that divided by snap.totalBytes which
                                            represents the total bytes in the file the TOTAL file size and then you
                                            TAKE these 2 and times them (*) by 100, so this is just a formula for 
                                            percentage.

                                            We take the bytes transferred, divide that by the total bytes and times 
                                            it by 100 to get a percentage, and that will now be the percentage of 
                                            the UPLOAD


                                      





     */
        //
        //
        // setProgress(percentage); , this is going to be now the percentage of the UPLOAD
        // now what you will do next, is set the value of this: [progress, setProgress] TO BE percentage
        // and that will basically be a number between 0 and 100
        setProgress(percentage);
        //
        /*
             EXPLANATION:    **        },
                                        (err) => {
                                              setError(err);
                                        }
                                      );
      
                   After the setProgress, you have to set up a third argument 
                   function, this function will fire if there s an error with the UPLOAD
                   AND if that is the case, all we want to do is SET THE ERROR 
                   using this function up here:
                   
                   
                             **  setError(err);
                   
                   and we'll pass in this error:
                   
                            **   (err);
                   
                   now eventually we are going to "return" that down on the bottom of
                the hook (later) like so:   return { progress, url, error };
                
                so that in the component we use in we can do something with that
                error if we want to.   And finally we can pass in another argument and this argument
                is also a function,  which is going to fire when the upload is fully complete
        
                                    },
                                    async () => {
                                        const url = await storageRef.getDownloadURL();
                                        setUrl(url);
                                        }
                                    );
                                                

                I am going to mark this as an ASYNC function, because we are going to use AWAIT inside
                this function, now what i want to do at this point, is get the URL of the image that has
                just been uploaded

                              **      getDownloadURL()

                 This line 203:
                 const url = await storageRef.getDownloadURL();

                 MEANS :    we want the storage.ref , So what it is doing, is that its taking the 
                 storage ref on line 54: const storageRef , so it finds the file we just uploaded:

                 projectStorage.ref(file.name); 
                 
                 and then it  get the download URL : 
                 
                 .getDownloadURL();  
                 
                 to then we are storing it inside this variable: const url =  , 
                from the line 203:  const url = await storageRef.getDownloadURL(); 

                Now all we need to do is set :     setUrl(url);  and pass in the url like so:    (url);

                This ULR doesn't OVERWRITE the url on the line 37 :   const [url, setUrl] = useState(null);
                BECAUSE its inside a separate SCOPE inside this function here:

                                                  async () => {
                                                    const url = await storageRef.getDownloadURL();
                                                    setUrl(url);
                                                    }
                                                    );

                we are only updating that value right here:
                                                         setUrl(url);

      */
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]); //this "file" is how you transport the hook info to other components

  /*

                                     **    THE LAST THING TO DO  ***


                                    WE have to return the values that we just finished
                                    using in the function useEffect, these values are:

                                        const [progress, setProgress] 
                                        const [error, setError] 
                                        const [url, setUrl] 

                                    


*/

  return { progress, url, error };
};
//  you have to export this hook so that you can use all the values you have inside of it,in another component.
export default useStorage;

/*
                                                ------------------
                                **        AFTER SETTING UP ALL THIS HOOK    **
                                                ------------------

                                     


                              useStorage
                                    
                            What we will do now , is create a NEW COMPONENT for a progress
                            BAR which will show the progress of the upload and we will use the HOOK
                            in that INSTEAD. so create a new COMPONENT, CALL IT : progressBar.js






                                                ------------------
                                **                  CLEAN VERSION              **
                                                ------------------








import { useState, useEffect } from "react";
//
//
//
import { projectStorage } from "../firebase/config";
//
// the HOOK ----------
const useStorage = (file) => {
  
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
   // ----------
  useEffect(() => {
    //
    const storageRef = projectStorage.ref(file.name);

    storageRef.put(file).on(
      "state_changed",
      //
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        //
        setProgress(percentage);
        //
      },    // ----------
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      }   // ----------
    );
  }, [file]);

  return { progress, url, error };
};
export default useStorage;
*/
