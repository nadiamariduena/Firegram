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
};
