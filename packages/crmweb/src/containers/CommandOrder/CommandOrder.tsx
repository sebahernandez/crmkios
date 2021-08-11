import '../../settings/constants'; 
import TopbarCommand from 'containers/Layout/Topbar/TopbarCommand';

import TodoPrivateWrapper from "./TodoPrivateWrapper"; 
import TodoClosedWrapper from "./TodoClosedWrapper"; 

 
/**
 * Develop by Alejandro Sandoval 
 * Alias Joker
 */
 

export default function CommandOrder({clientid}) {
  

	return (
	  <div>
      <TopbarCommand />
      <div className="row container-fluid p-left-right-0 m-left-right-0">
        <div className="row col-md-9 p-left-right-0 m-left-right-0">
          <div className="col-md-12 sliderMenu p-30">
            <TodoPrivateWrapper />  
          </div>
          
        </div>
		<div className="col-md-3 p-left-right-0">
		<div className="col-md-12 sliderMenu p-30 bg-gray">
            <TodoClosedWrapper />  
          </div>
        </div>

       {/*  <div className="col-md-3 p-left-right-0">
          <div className="col-md-12 sliderMenu p-30 bg-gray">
         		<OnlineUsersWrapper /> 
          </div>
        </div> */}
      </div>

      </div>
	)
}
