import React from "react";
import {useRouter} from "next/router";

export default function Page() {
  const router = useRouter()
  return <p>Project: {router.query.id}</p>
}