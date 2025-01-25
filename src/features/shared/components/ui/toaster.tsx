import { useToast } from "@shared/hooks/use-toast.ts";
import { Toast, ToastClose, ToastProvider, ToastViewport } from "@shared/components/ui/toast.tsx";
import { cn } from "@/lib/utils.ts";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, variant, ...props }) {
				return (
					<Toast key={id} {...props} variant={variant}>
						<div className="flex items-center gap-6">
							<div
								className={cn("text-p2", {
									"text-[#fff]": variant === "destructive",
									"text-primary-black": variant === "default",
								})}
							>
								{title}
							</div>
							<ToastClose
								className={cn({
									"text-[#fff]": variant === "destructive",
									"text-primary-black": variant === "default",
								})}
							/>
						</div>
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
