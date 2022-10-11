import React, { useState } from "react";
import AddLabels from "./AddLabels";
import AddStatus from "./AddStatus";
import IssuesOn from "./IssuesOn";
import IssuesPriority from "./IssuesPriority";
import ProjectType from "./ProjectType";
function MultipleConfig({ sidebar }) {
  const [togle, setTogle] = useState(1);
  const stateToggle = (i) => {
    setTogle(i);
  };
  return (
    <div>
      <div id="main_content">
        <div className={sidebar == true ? "page" : "spread_page"}>
          <div className="section-body mt-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-md-flex justify-content-between">
                        <ul className="nav nav-tabs b-none">
                          <li className="nav-item">
                            <a
                              className={togle === 1 ? "nav-link active" : ""}
                              data-toggle="tab"
                              onClick={() => stateToggle(1)}
                            >
                               Issues On
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={togle === 2 ? "nav-link active" : ""}
                              data-toggle="tab"
                              onClick={() => stateToggle(2)}
                            >
                              Issues Priority
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={togle === 3 ? "nav-link active" : ""}
                              data-toggle="tab"
                              onClick={() => stateToggle(3)}
                            >
                              Add label
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={togle === 4 ? "nav-link active" : ""}
                              data-toggle="tab"
                              onClick={() => stateToggle(4)}
                            >
                            Project Type
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={togle === 5 ? "nav-link active" : ""}
                              data-toggle="tab"
                              onClick={() => stateToggle(5)}
                            >
                             Add status
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* //*issue on Table */}

          <IssuesOn togle={togle} />

          {/* //* Issues Priority */}
          <IssuesPriority togle={togle} />

          {/* //* Add labels */}

          <AddLabels togle={togle} />
          {/* //* Project Type */}
          <ProjectType togle={togle} />
          {/* //* Add status */}
          <AddStatus togle={togle} />
        </div>
      </div>
    </div>
  );
}

export default MultipleConfig;
