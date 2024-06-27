"use client";

import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { createClient } from "../../../utils/supabase/client";

const LoginPage = () => {
  const signInWithKakao = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center px-8 py-16">
      <div className="w-full flex flex-col gap-10">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-2xl font-bold">클타임 로그인하기</h1>
          <p className="text-slate-500">
            암장 방문 기록을 위해서 로그인이 필요해요!
          </p>
        </div>
        <div className="flex flex-col">
          <button
            onClick={signInWithKakao}
            className="h-14 flex items-center rounded-lg border pl-6 pr-4 bg-slate-50"
          >
            <span className="flex-1 text-left font-bold">
              카카오톡 아이디로 로그인
            </span>
            <ArrowRightIcon className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
