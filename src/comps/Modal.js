import React from "react";
import { motion } from "framer-motion";
//
//

const Modal = ({ setSelectedImg, selectedImg }) => {
  // props by destructuring : ( {selectedImg} ) => {}

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
      /*                    only if the e event . target contains the class 'backdrop, only 
                            then this is going to fire ,if you notice when you click on the 
                            picture, it wont close but from the moment you click around it will close
                            
                            */
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img src={selectedImg} alt="enlarged pic" />

      {/*
        IN the case you want to animate the image, lets say you want the image droping from the top, then
        you can use this, if you want the img coming from the side, change the y for the x.
      
      <motion.img src={selectedImg} alt="enlarged pic"
initial={{y: "-100vh"}}
animate={{y: 0}}
/> */}
    </motion.div>
  );
};

export default Modal;

/*

Adding the Animtion with FRAMER MOTION packet

A production ready motion library
for React.

You have to install the framer motion dependency

- npm install framer-motion

The first things you are going to animate is the hover, when you hover an image 
for example.

1_ go to the image grid to do this
2_ Once there, import the following like so : import { motion } from "framer-motion";

3_ add motion to the opening of the tags of the divs you want to animate like so:




        <motion.div  className="img-wrap"  key={doc.id}  onClick={() => setSelectedImg(doc.url)}>

                 <img src={doc.url} alt="uploaded pic" />

                            </motion.div>



*/
