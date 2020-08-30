import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc") //the order of the images , descendent order ect
      // again the snap shot at real time
      .onSnapshot((snap) => {
        let documents = []; //because its empty from the start
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    //
    return () => unsub();
    //
  }, [collection]);

  return { docs };
};

/*
                                            *

                    GO TO THE END OF THE progressBar.js to read the first part
                        


                  -  (collection) => the collection you want to get DOCUMENTS from
                  - In our case it s going to g, the images collection



*/

export default useFirestore;
