import React from "react";
import user from "../../assets/user.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
function Dashboard({ sidebar }) {
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12" style={{ display: "flex" }}>
                <h3 className="page-title">Welcome Admin!</h3>
                {/* <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   {" "}
    //   <div id="main_content">
    //     <div className={sidebar == true ? "page" : "spread_page"}>
    //       <div className="section-body">
    //         <div className="container-fluid">
    //           <div className="tab-content">
    //             <div
    //               className="tab-pane fade show active"
    //               id="list"
    //               role="tabpanel"
    //             >
    //               <div className="row clearfix">
    //                 <div className="col-xl-4 col-lg-4 col-md-6">
    //                   <div className="card">
    //                     <div className="card-body text-center ribbon">
    //                       <div className="ribbon-box green">New</div>
    //                       <img
    //                         className="rounded-circle img-thumbnail w100"
    //                         src={user}
    //                         alt
    //                       />
    //                       <h6 className="mt-3 mb-0">Michelle Green</h6>
    //                       <span>jason-porter@info.com</span>
    //                       <ul className="mt-3 list-unstyled d-flex justify-content-center">
    //                         <li>
    //                           <a className="p-3" target="_blank" href="#">
    //                             <FacebookIcon />
    //                           </a>
    //                         </li>
    //                         <li>
    //                           <a className="p-3" target="_blank" href="#">
    //                             <TelegramIcon />
    //                           </a>
    //                         </li>
    //                         <li>
    //                           <a className="p-3" target="_blank" href="#">
    //                             <LinkedInIcon />
    //                           </a>
    //                         </li>
    //                       </ul>
    //                       <button className="btn btn-default btn-sm">
    //                         View Profile
    //                       </button>
    //                       <button className="btn btn-default btn-sm">
    //                         Message
    //                       </button>
    //                       <div className="row text-center mt-4">
    //                         <div className="col-6 border-right">
    //                           <label className="mb-0">Project</label>
    //                           <h4 className="font-18">07</h4>
    //                         </div>
    //                         <div className="col-6">
    //                           <label className="mb-0">Deal</label>
    //                           <h4 className="font-18">$2,510</h4>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Dashboard;
