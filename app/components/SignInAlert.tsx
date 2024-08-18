import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  import { signIn } from 'next-auth/react'

  interface SignInAlertProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

const SignInAlert: React.FC<SignInAlertProps>  = ({isOpen, setIsOpen}) => {

    return (
<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
  <AlertDialogContent className="max-w-[60vh]">
    <AlertDialogHeader className="flex justify-center items-center">
      <AlertDialogTitle>Looks like you are not Signed In</AlertDialogTitle>
      <AlertDialogDescription className="flex flex-col items-center">
          <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-100  hover:border-slate-400 dark:hover:border-slate-500 hover:shadow transition duration-150 bg-slate-600 hover:text-slate-400 my-[20px] mt-[15px]" onClick={() => signIn('google')}>
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
          <span>Login with Google</span>
      </button>
      <p className="text-center hover:cursor-pointer mt-[10px] text-sm border-b-2 inline-block" onClick={() => setIsOpen(false)}>Stay Signed Out</p>
      </AlertDialogDescription>
    </AlertDialogHeader>
    {/* <AlertDialogFooter className="flex justify-center items-center">
      <AlertDialogCancel className="hover:bg-transparent text-[2.2vh] hover:border-none border-none">Stay Signed Out</AlertDialogCancel>
    </AlertDialogFooter> */}
  </AlertDialogContent>
</AlertDialog>
    )
}

export default SignInAlert;