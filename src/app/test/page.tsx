import React, { ReactElement } from "react";
import { Header } from "@header";

const TestPage = async (): Promise<ReactElement> => {
  return (
    <div className="flex justify-center">
      <div className="container mx-auto px-4">
        <Header />
      </div>
    </div>
  );
};

export default TestPage;
