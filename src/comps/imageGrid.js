import React from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
//

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore("images");
  // console.log(docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          //
          //
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            /* 




                                            whileHover={{ opacity: 1 }}

            // this {{}} because you are going to use some css properties
            // remember the opacity in the css is at : 0.8
            
            
            THE LAYOUT attr is going to make that when you upload an image, instead of pushing the other images
            in a rude way, the layout attr is going to make it smoothly  
            
            Now do the same with the <img like so:

                 <motion.img
              src={doc.url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
            
            NOW GO TO THE PREGRESS BAR to animate it.
            */

            /* -------------------------------------------------------------------------
            
            
            So now whenever you click on an image, you are updating the value of this:
 
            line 8 App.js:
            const [selectedImg,    
              
            SO  you are updating the value with the URL of that image, now you can pass it through here:


                                   <Modal selectedImg={selectedImg} />
           


            */
            onClick={() => setSelectedImg(doc.url)}
          >
            <motion.img
              src={doc.url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // it will take one sec until the img appears
              transition={{ delay: 1 }}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default ImageGrid;
