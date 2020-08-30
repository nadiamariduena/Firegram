import React from "react";

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
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImg} alt="enlarged pic" />
    </div>
  );
};

export default Modal;
