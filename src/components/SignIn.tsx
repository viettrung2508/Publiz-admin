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
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="flex-1 max-w-4xl mx-auto overflow-hidden  rounded-lg dark:bg-gray-800">
        <div className="flex flex-col justify-center overflow-y-auto md:flex-row">
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex items-center justify-center p-6 sm:p-12 md:w-1/2"
          >
            <div className="w-full text-white">
              <label className="block text-sm">
                <span className=" ">Email</span>
                <input
                  type="email"
                  className="block w-full mt-1 text-sm p-2 bg-zinc-800 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple  dark:focus:shadow-outline-gray form-input"
                  {...register("email")}
                />
              </label>
              <label className="block mt-4 text-sm">
                <span className="">
                  Password
                </span>
                <input
                  type="password"
                  className="block w-full mt-1 text-sm p-2  bg-zinc-800 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  {...register("password")}
                />
              </label>
              <button
                disabled={!isValid || mutationSignIn.isPending}
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-black transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
