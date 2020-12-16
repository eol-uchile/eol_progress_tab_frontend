import React from "react";
import { useResizeIFrame } from "./hooks/useResizeIFrame";
import { getCourseId } from "./helpers/getCourseInfo";

export default function ProgressTabPage() {
  useResizeIFrame(); // Resize Iframe on height changes
  const courseId = getCourseId();
  return (
    <div id="content" className="container">
      <h3>Progress Tab Frontend Working ! { courseId }</h3>
    </div>
  );
}