import { ErrorMessage } from "./error-message";
import { Spinner } from "./shadcn-io/spinner";

export function LoadingState({ children, loading, error, empty }: 
{
  children: React.ReactNode,
  loading: boolean,
  error?: Error | null,
  empty?: boolean,
}) {
  if (loading) return <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm"><Spinner /></div>
  if (error) return <ErrorMessage message={error}/>
  if (empty) return null
  return children
}