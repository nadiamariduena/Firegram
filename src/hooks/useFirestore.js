import { useState, useEffect } from "react";

import { projectFirestore } from "../firebase/config";
//

const useFirestore = (collection) => {
  // setDocs to update the documents
  //   in the beginning its going to be an empty array like so: ([]); and thats because we dont have any docs
  const [docs, setDocs] = useState([]);

  return { docs };
};

/*
                                            *

                    GO TO THE END OF THE progressBar.js to read the first part
                        


                  -  (collection) => the collection you want to get DOCUMENTS from
                  - In our case it s going to g, the images collection



*/
