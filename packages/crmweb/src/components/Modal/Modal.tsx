import Button from "components/Button/Button";
import { Fragment } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap"; 
import Cookies  from 'universal-cookie';




/* import 'bootstrap/dist/css/bootstrap.min.css'; */ 

export const ModalCommand = ({order}) => {
    const cookie = new Cookies()   
    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [url] = useState(cookie.get('suscriptor').negocio_web+"/ordercrm?order="+order)
    
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
      <Modal className="modal-container custom-map-modal"  show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>

                <iframe
                    className="resp-iframe"
                    id="inlineFrameExample"
                    title="checkout"
                    height="1000px"
                    width="1100px"
                    src={url}>
                </iframe>
      </Modal>

    
        </div>
    );
  }

  
  
 export default ModalCommand;