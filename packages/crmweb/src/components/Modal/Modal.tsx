import Button from "components/Button/Button";
import { useState } from "react";
import { Modal } from "react-bootstrap"; 
/* import 'bootstrap/dist/css/bootstrap.min.css'; */ 

export const ModalCommand = ({order}) => {
    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [url] = useState("https://shop.tu-ecommerce.cl/ordercrm?order="+order)
    
    
    
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    
  
    return (

   <div className="col-md-12">
       
      {values.map((v, idx) => (
        <Button key={idx} className="me-2" onClick={() => handleShow(v)}>
          Detalle
          {typeof v === 'string' && `below `}
        </Button>
      ))}
      <Modal  show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
       
        <Modal.Body>
        
                <iframe id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="1000px"
                    height="1000px"
                    src={url}>
                </iframe>

        
        </Modal.Body>
      </Modal>

    
        </div>
    );
  }

  
  
 export default ModalCommand;