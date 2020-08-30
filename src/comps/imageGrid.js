import React from "react";
import useFirestore from "../hooks/useFirestore";

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
          <div
            className="img-wrap"
            key={doc.id}
            /* 
            
            
            So now whenever you click on an image, you are updating the value of this:
 
            line 8 App.js:
            const [selectedImg,    
              
            SO  you are updating the value with the URL of that image, now you can pass it through here:


                                   <Modal selectedImg={selectedImg} />
           


            */
            onClick={() => setSelectedImg(doc.url)}
          >
            <img src={doc.url} alt="uploaded pic" />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
