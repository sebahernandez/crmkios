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
  <div className="container-fluid bg-light pt-5">
    <div className="row">
      <div className="col-md-8">
        <TodoPrivateWrapper />
      </div>
      <div className="col-md-4">
        <TodoClosedWrapper />
      </div>
    </div>
    {/* <div className="col-md-3 p-left-right-0">
      <div className="col-md-12 sliderMenu p-30 bg-gray">
        <OnlineUsersWrapper />
      </div>
    </div> */}
  </div>

</div>
)
}