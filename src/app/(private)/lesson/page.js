"use client";

import FinishResult from "@/components/FinishResult";
import Lessons from "@/components/Lessons";

import Header from "@/components/Header";
import { useState } from "react";

export default function LessonPage() {
  const [findIndex, setFindIndex] = useState(0);

  return (
    <div>
      <Header />
      <Lessons findIndex={findIndex} setFindIndex={setFindIndex} />
    </div>
  );
}
