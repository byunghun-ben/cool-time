import SignupForm from "./components/SignupForm";

const ClimbPage = async () => {
  return (
    <div>
      <h1>Climb</h1>
      <div className="max-w-sm border p-6 mx-auto">
        <SignupForm />
      </div>
    </div>
  );
};

export default ClimbPage;
