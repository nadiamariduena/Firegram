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


                                                            *
                                                   --------------------
                                          REMOVE THE PROGRESS BAR once  we reach the 100%
                                                    --------------------


                                                 seEffect(() => {  }, [url]);
  
                           Here you will pass a FUNCTION that will run when the URL changes



                                                            *                                    

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
  //
  //
  //                                    -----------------------------------------------------------
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





                                                    ----------------------------------

                                                create a NEW custom HOOK called : USE FIRESTORE

                                                    ----------------------------------




                                               Create a new component inside the comps folder and
                                                    call it : imageGrid.js


                                                    once you created the following, you will want to access
                                                    the DATA from our firestore database:

                                                    import React from "react";

                                                        const ImageGrid = () => {
                                                        return <div className="img-grid">images</div>;
                                                        };

                                                        export default ImageGrid;


                                                TO ACCESS it, we could import the sdk into the grid file and 
                                                grab the data that way but instead, we are going to create another
                                                 HOOK to do all the jeavy lifting for US, that way we make our 
                                                 code more reusable  any time we want to get FIRESTORE data from
                                                 a collection we could just use  the use firestore HOOK that    we
                                                 are going to create.

                                                 go to the hooks folder and create a file called: useFirestore.js


                                                 continue there







*/
