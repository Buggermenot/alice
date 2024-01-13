"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Wrapper, CenterBox } from "../../components";
import { LoginForm } from "../../module";

import { useQID } from "@/hooks/use-qid";

export default function Login() {
  const { qid } = useQID();
  const router = useRouter();

  useEffect(() => {
    if (!qid) return;
    router.push("/");
  }, [qid]);

  return (
    <Wrapper className={`py-10`}>
      <CenterBox className={`pt-12`}>
        <LoginForm />
      </CenterBox>
    </Wrapper>
  );
}
