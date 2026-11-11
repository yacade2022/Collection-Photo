import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import errorMessage from "../utils/errorMessage";
import AuthShell from "../components/AuthShell";
import Field from "../components/Field";

export const action = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Account created. Log in to start your collection.");
    return redirect("/login");
  } catch (error) {
    toast.error(errorMessage(error, "Couldn't create your account. Try again."));
    return null;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthShell
      title="Create an account"
      intro="Start a private collection of your photos."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-cyan underline-offset-4 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <Form method="post" className="space-y-5">
        <Field label="Name" name="name" autoComplete="name" required autoFocus />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          maxLength={12}
          hint="6 to 12 characters."
          required
        />
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? "Creating account…" : "Create account"}
        </button>
      </Form>
    </AuthShell>
  );
};

export default Register;
