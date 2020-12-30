import React from "react";
import { useResizeIFrame } from "./hooks/useResizeIFrame";
import { getCourseId } from "./helpers/getCourseInfo";
import { AboutGrid } from "./components/AboutGrid";
import { ProgressGrid } from "./components/ProgressGrid";

import { useFetchStudentData } from './hooks/useFetchStudentData';
import { CertificateContainer } from './components/CertificateContainer';

export default function ProgressTabPage() {
  useResizeIFrame(); // Resize Iframe on height changes
  const courseId = getCourseId();
  const [studentState, setStudentState] = useFetchStudentData( courseId );
  return (
    <div id="content" className="container">
      { 
        studentState.student_data.certificate_data?.url && (
          <CertificateContainer certificate={studentState.student_data.certificate_data} setStudentState={setStudentState} />
        )  
      }
      <div className="row">
        <div className="col-xl-5 order-xl-12 p-3">
          <AboutGrid courseId={ courseId } />
        </div>
        <div className="col-xl-7 order-xl-1 p-3">
          <ProgressGrid studentState={ studentState }/>
        </div>
      </div>
    </div>
  );
}