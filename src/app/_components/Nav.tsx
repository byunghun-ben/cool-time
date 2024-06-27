import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

type Props = {
  userId?: string;
};

const Nav = ({ userId }: Props) => {
  const isLoggedIn = !!userId;

  const signOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 h-12 bg-white border-b px-4 flex items-center justify-between">
      <Link href="/climb" className="font-black text-slate-700">
        클(라이밍 쿨)타임
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/climb" className="text-sm font-bold text-slate-700">
          전체 암장 보기
        </Link>
        {!isLoggedIn && (
          <Link href="/auth/login" className="text-sm font-bold text-slate-700">
            로그인
          </Link>
        )}
        {isLoggedIn && (
          <form action={signOut}>
            <button type="submit" className="text-sm font-bold text-slate-700">
              로그아웃
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Nav;
