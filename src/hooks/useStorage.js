import { useState, useEffect } from "react";
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

/*



                                     ***       SHOW THE IMAGES we UPLOADED  ***


                                                NEXT thing we will do is cycle the images
                                                we have inside the STORAGE and ADD the to 
                                                the DATABASE.


                             1_ we need to store the URL's of the images inside the DATABASE,
                                so that we can use the data to show the images in he browser.

                            2_  Go back to the userStorage HOOK, line 204:
                                  async () => {
                                    const url = await storageRef.getDownloadURL();
                                    setUrl(url);

                            3_ at that point we want to save this URL to the firestore
                            4_ WHAT we want is to make a document out of the images that we have 
                                    in storage with of course the URL's

                            5_ import the project FIRESTORE from the config.js we have here (we
                                have the project firestore EXPORTED on the bottom )
                            6_  to export it, add the following to this line in useStorage.js:

                            Add this:
                            projectFirestore
                            to this:
                            import { projectStorage } from "../firebase/config";
                            it should look like so:

                            import { projectStorage, projectFirestore } from "../firebase/config";

                            NEXT...

                            7_ WE NEED to make a reference to a CoLLECTION that we want to save
                            the document to:

                            8_ go to line 56 in useStorage.js and add the following:

                                const collectionRef = projectFirestore.collection("images");

                            9_ then  go to line 206 in useStorage.js and add the following:

                            the above obj represent "this document we just mentioned in step 4"

                             collectionRef.add({ url, createdAt });

                             its going to give you and error because to use this, you have to 
                             go to the config.js and create the function linked to time stamp
                             , so follow these steps i wrote there and then go back to the
                             useStorage.js and import it in the beginning of the file like so:

                             import {
                                 projectStorage,
                                    projectFirestore,
                                                         timestamp,
                        } from "../firebase/config";

                **        AND THEN 
                         go to line 210 in the same file you just imported the stuff, and add the
                         following:
                           const createdAt = timestamp();
                           
                           ** remember timestamp(); is a function in the config, it will
                           help you to keep a timestamp inprint of when the user uploaded
                           the image and it will help you to keep it chronologically.

                           NOW you can use the 2timestamp"

                        line 211:     collectionRef.add({ url, createdAt });


                        So once the UPLOAD is completed, line 211 useStorage:  createdAt });
                        we have the url, line 209 useStorage:   const url =   ,
                        we created a new document , line 211:  collectionRef.add ,
                        inside the collection , line 60:  = projectFirestore.collection("images");
                                        to match that images that s just been uploaded
                                        and we are storing a URL, line 211:
                                        
                                        add({ url, createdAt });
                                        
                                        of that image and when
                                        it was created:
                                        
                                         
                                        createdAt });

                                        okay thats all we are doing here

                                 ***       NOW go back to the firebase STORAGE and delete all the images
                                 because they dont have the documents associated with them inside the firestore.

                                 - Try to upload A NEW image

                                 - once its UPLOADED, refresh the firebase page and then go to the
                                 database inside the CLOUD Firestore, you should have a collection
                                 called images and a code and the url 


                                 This MEANS that we can now LISTEN to this COLLECTION from our website to get all
                                 of the urls in real time as they are added into our project, now the next step will be
                                 create a NEW custom HOOK called : USE FIRESTORE

*/
