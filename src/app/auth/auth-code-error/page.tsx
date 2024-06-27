type Props = {
  params: Record<string, string>;
  searchParams: { [key: string]: string | string[] | undefined };
};

const AuthCodeErrorPage = ({ searchParams }: Props) => {
  if (searchParams.error_description) {
    console.error(`Auth 에러: ${searchParams.error_description}`);
  }

  return (
    <div className="flex flex-col gap-6 text-center px-6 py-10">
      <h1 className="text-2xl font-bold">어라라...?</h1>
      <div className="flex flex-col gap-2 text-sm text-slate-500">
        <p>로그인 과정에서 문제가 발생했어요. 로그인을 다시 시도해주세요 :)</p>
        <p>문제가 지속되면 @de.gu.r.r 에게 DM으로 문의해주세요.</p>
      </div>
    </div>
  );
};

export default AuthCodeErrorPage;
