import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import errorMessage from "../utils/errorMessage";
import AuthShell from "../components/AuthShell";
import Field from "../components/Field";

export const action = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());

  try {
    await customFetch.post("/auth/login", data);
    return redirect("/collection");
  } catch (error) {
    toast.error(errorMessage(error, "Couldn't log in. Check your email and password."));
    return null;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AuthShell
      title="Welcome back"
      intro="Log in to see your collection."
      footer={
        <>
          New here?{" "}
          <Link to="/" className="font-semibold text-cyan underline-offset-4 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <Form method="post" className="space-y-5">
        <Field label="Email" name="email" type="email" autoComplete="email" required autoFocus />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={6}
          maxLength={12}
          required
        />
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? "Logging in…" : "Log in"}
        </button>
      </Form>
    </AuthShell>
  );
};

export default Login;
