import React from "react";
import { useResizeIFrame } from "./hooks/useResizeIFrame";
import { getCourseId } from "./helpers/getCourseInfo";
import { AboutGrid } from "./components/AboutGrid";
import { ProgressGrid } from "./components/ProgressGrid";

export default function ProgressTabPage() {
  useResizeIFrame(); // Resize Iframe on height changes
  const courseId = getCourseId();
  return (
    <div id="content" className="container">
      <div className="row">
        <div className="col-xl-5 order-xl-12 p-3">
          <AboutGrid courseId={ courseId }/>
        </div>
        <div className="col-xl-7 order-xl-1 p-3">
          <ProgressGrid courseId={ courseId }/>
        </div>
      </div>
    </div>
  );
}