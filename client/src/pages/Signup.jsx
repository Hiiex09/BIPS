import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Upload } from "lucide-react";
import { useSignup } from "../hooks/UseAuthRouteHooks";
import AuthShell from "../components/public/AuthShell";

const fieldClass =
  "input field";

const emptyForm = {
  firstName: "",
  lastName: "",
  address: "",
  mobile: "",
  email: "",
  password: "",
  idUpload: null,
};

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const { mutate: signup, isPending, error } = useSignup();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, idUpload: file || null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("firstName", formData.firstName);
    submitData.append("lastName", formData.lastName);
    submitData.append("address", formData.address);
    submitData.append("mobile", formData.mobile);
    submitData.append("email", formData.email);
    submitData.append("password", formData.password);
    if (formData.idUpload) {
      submitData.append("idUpload", formData.idUpload);
    }

    signup(submitData, {
      onSuccess: () => setFormData(emptyForm),
    });
  };

  return (
    <AuthShell
      title="Register as a resident"
      intro="The hall uses these details to verify that you live in Tejero."
      footnote="By registering, you agree to the portal's Terms of Service and Privacy Policy."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div role="alert" className="rounded-md border border-error/40 bg-error/5 px-4 py-3 text-sm text-error">
            {error.response?.data?.message || error.message || "Registration didn't go through. Check your details and try again."}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="signup-firstname" className="text-sm font-semibold">First name</label>
            <input
              id="signup-firstname"
              type="text"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`${fieldClass} mt-1.5`}
              required
              disabled={isPending}
            />
          </div>
          <div>
            <label htmlFor="signup-lastname" className="text-sm font-semibold">Last name</label>
            <input
              id="signup-lastname"
              type="text"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`${fieldClass} mt-1.5`}
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-address" className="text-sm font-semibold">Home address</label>
          <textarea
            id="signup-address"
            name="address"
            autoComplete="street-address"
            value={formData.address}
            onChange={handleInputChange}
            className="textarea field mt-1.5"
            placeholder="House no., street, purok"
            rows={2}
            required
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-mobile" className="text-sm font-semibold">Mobile number</label>
            <input
              id="signup-mobile"
              type="tel"
              name="mobile"
              autoComplete="tel"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="0912 345 6789"
              className={`${fieldClass} mt-1.5`}
              required
              disabled={isPending}
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="text-sm font-semibold">Email</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${fieldClass} mt-1.5`}
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-semibold">Password</label>
          <div className={`${fieldClass} mt-1.5 flex items-center gap-2 pr-1.5`}>
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              aria-describedby="signup-password-hint"
              className="grow bg-transparent"
              required
              minLength="8"
              disabled={isPending}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-ghost btn-xs btn-square text-base-content/60 hover:text-base-content"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p id="signup-password-hint" className="mt-1.5 text-xs text-base-content/60">
            At least 8 characters.
          </p>
        </div>

        <div>
          <span className="text-sm font-semibold">
            Valid ID <span className="font-normal text-base-content/60">(optional, speeds up verification)</span>
          </span>
          <label className="mt-1.5 flex cursor-pointer items-center gap-4 rounded-md border border-dashed border-base-content/50 bg-base-100 px-4 py-4 hover:border-primary focus-within:border-primary">
            <Upload size={22} className="shrink-0 text-primary" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold truncate">
                {formData.idUpload ? formData.idUpload.name : "Choose a photo or PDF of your ID"}
              </span>
              <span className="block text-xs text-base-content/60">PNG, JPG or PDF, up to 5 MB</span>
            </span>
            <input
              type="file"
              className="sr-only"
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.pdf"
              disabled={isPending}
            />
          </label>
        </div>

        <button type="submit" disabled={isPending} className="btn-stamp w-full">
          {isPending ? "Registering…" : "Register"}
        </button>
      </form>

      <p className="mt-6 text-sm text-base-content/70">
        Already registered?{" "}
        <Link to="/login" className="link-ink font-semibold text-base-content">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
};

export default Signup;
