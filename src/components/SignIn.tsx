import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type SignInSchemaPayload = z.infer<typeof signInSchema>;

export const SignIn: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignInSchemaPayload>({
    resolver: zodResolver(signInSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const auth = useAuth();

  const mutationSignIn = useMutation({
    mutationFn: ({ email, password }: SignInSchemaPayload) => {
      return auth.signIn({ email, password });
    },
    onSuccess: () => { },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSignIn = (payload: SignInSchemaPayload) => {
    mutationSignIn.mutate(payload);
  };

  return (
    <div className="flex  justify-center min-h-screen bg-zinc-900 pt-32">
      <div className="flex-1 max-w-4xl mx-auto overflow-hidden  rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex justify-center flex-col overflow-y-auto md:flex-row">
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex items-center justify-center p-6 sm:p-12 md:w-1/2"
          >
            <div className="w-full">
              <img src="Logo.png" />
              <label className="block text-sm pt-6">
                <span className="text-white text-base font-medium">Email</span>
                <input
                  type="email"
                  className="block w-full p-2 mt-2 rounded-lg text-sm dark:border-gray-600 bg-zinc-800  focus:outline-none focus:shadow-outline-purple text-white dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  {...register("email")}
                />
              </label>
              <label className="block mt-2 text-sm">
                <span className="text-white text-base font-medium	">
                  Password
                </span>
                <input
                  type="password"
                  className="block w-full mt-2 text-sm p-2 rounded-lg dark:border-gray-600 bg-zinc-800 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 text-white dark:focus:shadow-outline-gray form-input"
                  {...register("password")}
                />
              </label>
              <button
                disabled={!isValid || mutationSignIn.isPending}
                className="block w-full px-4 py-2 mt-4 text-base font-normal leading-5 text-center text-black transition-colors duration-150 bg-[#FFCE31] 0 border border-transparent rounded-lg   focus:outline-none focus:shadow-outline-purple"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
