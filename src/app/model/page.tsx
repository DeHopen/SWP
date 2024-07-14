import CommunicationWindow from "@/components/ModelPage/ModelPage";
import {Suspense} from "react";


export default function Model() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <CommunicationWindow />
      </Suspense>
  );
}